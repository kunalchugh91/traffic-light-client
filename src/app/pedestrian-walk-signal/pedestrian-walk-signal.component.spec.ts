import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedestrianWalkSignalComponent } from './pedestrian-walk-signal.component';

describe('PedestrianWalkSignalComponent', () => {
  let component: PedestrianWalkSignalComponent;
  let fixture: ComponentFixture<PedestrianWalkSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedestrianWalkSignalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedestrianWalkSignalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display `Walk` when required', () => {
    component.displayWalk = true;
    fixture.detectChanges();
    const paragraphElement = fixture.nativeElement.querySelector('p');
    expect(paragraphElement.textContent).toEqual('Walk');
  });

  it('should display `Dont Walk` when required', () => {
    component.displayWalk = false;
    fixture.detectChanges();
    const paragraphElement = fixture.nativeElement.querySelector('p');
    expect(paragraphElement.textContent).toEqual(' Dont Walk ');
  });

  it('should emit event when user clicks Walk btn', async () => {
    const onBtnClickedSpy = spyOn<EventEmitter<boolean>>(
      component.onWalkBtnPushed,
      'emit'
    ).and.callThrough();
    component.displayWalk = false;
    fixture.detectChanges();
    const btnElement: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button'
    );
    btnElement.click();
    await fixture.whenStable();
    expect(onBtnClickedSpy).toHaveBeenCalledWith(true);
  });
});
