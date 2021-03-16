import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription, timer } from 'rxjs';
import {
  switchMap,
  tap,
  share,
  takeUntil,
  mergeMap,
  delay,
  repeat,
} from 'rxjs/operators';
import { TLState, TLStatusRequest, TLStatusResponse } from '../app.model';

@Component({
  selector: 'traffic-light-container',
  templateUrl: './traffic-light-container.component.html',
  styleUrls: ['./traffic-light-container.component.css'],
})
export class TrafficLightContainerComponent implements OnInit, OnDestroy {
  readonly numberOfLights: number = 3;

  trafficLightState$: Observable<any>;
  destroy$: Subject<void> = new Subject<void>();
  pollingSubscription: Subscription;

  currentState: TLState = TLState.STOP;
  currentLight: number = 0;
  isWalkBtnPushed: boolean = false;
  trafficLightStates: TLState[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // initialize all traffic lights with STOP state
    this.trafficLightStates = new Array(this.numberOfLights).fill(TLState.STOP);

    this.setupTrafficStatusPolling();
  }

  setupTrafficStatusPolling() {
    this.pollingSubscription = timer(1, 3000)
      .pipe(
        switchMap((_) => {
          const body: TLStatusRequest = {
            state: this.currentState,
            numberOfLights: this.numberOfLights,
            currentLight: this.currentLight,
            walkBtnPushed: this.isWalkBtnPushed,
          };
          return this.http.post('/api', body);
        }),
        share(),
        takeUntil(this.destroy$)
      )
      .subscribe((nextStatus: TLStatusResponse) =>
        this.processNextStatus(nextStatus)
      );
  }

  processNextStatus(nextStatus: TLStatusResponse) {
    if (this.currentLight >= 0) {
      this.trafficLightStates[this.currentState] = TLState.STOP;
    }
    if (nextStatus.currentLight >= 0) {
      this.trafficLightStates[nextStatus.currentLight] = nextStatus.state;
    }

    this.currentState = nextStatus.state;
    this.currentLight = nextStatus.currentLight;

    if (nextStatus.state == TLState.WALK) {
      this.isWalkBtnPushed = false;
    }
  }

  onWalkBtnPushed() {
    this.isWalkBtnPushed = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
