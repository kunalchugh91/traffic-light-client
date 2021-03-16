import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pedestrian-walk-signal',
  templateUrl: './pedestrian-walk-signal.component.html',
  styleUrls: ['./pedestrian-walk-signal.component.css'],
})
export class PedestrianWalkSignalComponent {
  @Input()
  displayWalk: boolean;

  @Output()
  onWalkBtnPushed: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onBtnPushed() {
    this.onWalkBtnPushed.emit(true);
  }
}
