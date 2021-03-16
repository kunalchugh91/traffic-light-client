export enum TLState {
  GO = 'GO',
  PREPARE_TO_STOP = 'PREPARE_TO_STOP',
  STOP = 'STOP',
  WALK = 'WALK',
}

export interface TLStatusRequest {
  state: TLState;
  numberOfLights: number;
  currentLight: number;
  walkBtnPushed: boolean;
}

export interface TLStatusResponse {
  state: TLState;
  currentLight: number;
}
