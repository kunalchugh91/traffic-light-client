import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TrafficLightContainerComponent } from './traffic-light-container.component';
import { TrafficLightComponent } from '../traffic-light/traffic-light.component';
import { PedestrianWalkSignalComponent } from '../pedestrian-walk-signal/pedestrian-walk-signal.component';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { TLStatusResponse, TLState } from '../app.model';

describe('TrafficLightContainerComponent', () => {
  let component: TrafficLightContainerComponent;
  let fixture: ComponentFixture<TrafficLightContainerComponent>;
  let httpService: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TrafficLightContainerComponent,
        MockComponent(TrafficLightComponent),
        MockComponent(PedestrianWalkSignalComponent),
      ],
      providers: [{ provide: HttpClient, useValue: { post: () => {} } }],
    }).compileComponents();
  });

  beforeEach(() => {
    httpService = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(TrafficLightContainerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpService = null;
    fixture.destroy();
    fixture = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup periodic polling of traffic status', fakeAsync(() => {
    const mock1: TLStatusResponse = { state: TLState.GO, currentLight: 0 };
    const mock2: TLStatusResponse = {
      state: TLState.PREPARE_TO_STOP,
      currentLight: 0,
    };
    const mock3: TLStatusResponse = { state: TLState.STOP, currentLight: 0 };
    const mock4: TLStatusResponse = { state: TLState.GO, currentLight: 1 };
    const fakeValues = [of(mock1), of(mock2), of(mock3), of(mock4)];

    const processNextStatusSpy = spyOn(
      component,
      'processNextStatus'
    ).and.stub();
    const postSpy = spyOn(httpService, 'post').and.returnValues(...fakeValues);
    fixture.detectChanges();

    tick(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
    tick(3000);
    expect(postSpy).toHaveBeenCalledTimes(2);
    tick(3000);
    expect(postSpy).toHaveBeenCalledTimes(3);
    tick(3000);
    expect(postSpy).toHaveBeenCalledTimes(4);

    expect(processNextStatusSpy.calls.allArgs()).toEqual([
      [mock1],
      [mock2],
      [mock3],
      [mock4],
    ]);
    component.pollingSubscription.unsubscribe();
  }));

  it('should process next response', () => {
    const previousLightNo = 0;
    const previousState = TLState.STOP;
    component.trafficLightStates = [TLState.STOP, TLState.STOP];
    component.currentState = previousState;
    component.currentLight = previousLightNo;

    component.processNextStatus({ state: TLState.GO, currentLight: 1 });
    expect(component.trafficLightStates[previousLightNo]).toEqual(TLState.STOP);
    expect(component.trafficLightStates[1]).toEqual(TLState.GO);
    expect(component.currentState).toEqual(TLState.GO);
    expect(component.currentLight).toEqual(1);
  });
});
