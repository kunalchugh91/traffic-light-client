import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TLState } from '../app.model';

@Component({
  selector: 'traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css'],
})
export class TrafficLightComponent implements OnChanges {
  @Input()
  currentState: TLState;

  showRed: boolean;
  showYellow: boolean;
  showGreen: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['currentState'].currentValue) {
      this.updateLightState();
    }
  }

  updateLightState() {
    this.showGreen = false;
    this.showRed = false;
    this.showYellow = false;

    if (this.currentState === TLState.GO) {
      this.showGreen = true;
    }
    if (this.currentState === TLState.PREPARE_TO_STOP) {
      this.showYellow = true;
    }
    if (this.currentState === TLState.STOP) {
      this.showRed = true;
    }
  }
}
