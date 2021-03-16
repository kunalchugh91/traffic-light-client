import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrafficLightComponent } from './traffic-light.component';
import { TLState } from '../app.model';
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: `dummy-container`,
  template: `<traffic-light [currentState]="currentState"></traffic-light>`,
})
class DummyContainer {
  @ViewChild(TrafficLightComponent)
  trafficLightComp: TrafficLightComponent;

  currentState: TLState;
}

describe('TrafficLightComponent', () => {
  let containerComponent: DummyContainer;
  let containerFixture: ComponentFixture<DummyContainer>;
  let component: TrafficLightComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyContainer, TrafficLightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    containerFixture = TestBed.createComponent(DummyContainer);
    containerComponent = containerFixture.componentInstance;
    containerFixture.detectChanges();
    component = containerComponent.trafficLightComp;
  });

  afterEach(() => {
    containerFixture.destroy();
    containerFixture = null;
    component = null;
    containerComponent = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update component state on change detection', () => {
    containerComponent.currentState = TLState.GO;
    containerFixture.detectChanges();
    const updateStateSpy = spyOn<any>(component, 'updateLightState').and.stub();
    
    
    containerComponent.currentState = TLState.PREPARE_TO_STOP;
    containerFixture.detectChanges();
    expect(updateStateSpy).toHaveBeenCalled();
  });

  it('updateLightState should update component state appropriately', () => {
    component.currentState = TLState.GO;
    component['updateLightState']();
    expect(component.showGreen).toEqual(true);
    expect(component.showRed).toEqual(false);
    expect(component.showYellow).toEqual(false);

    component.currentState = TLState.PREPARE_TO_STOP;
    component['updateLightState']();
    expect(component.showGreen).toEqual(false);
    expect(component.showRed).toEqual(false);
    expect(component.showYellow).toEqual(true);

    component.currentState = TLState.STOP;
    component['updateLightState']();
    expect(component.showGreen).toEqual(false);
    expect(component.showRed).toEqual(true);
    expect(component.showYellow).toEqual(false);
  });
});
