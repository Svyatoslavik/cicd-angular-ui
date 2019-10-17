import { TTimeStamp, TBuildStatus } from '../types/types';

export interface IStep {
  id: string;
  buildId: number;
  name: string;
  status: TBuildStatus;
  logs: string[];
  logsFrom: number;
  logsTo: number;
  logsTotal: number;
  // logsCount: number;
  startedAt?: TTimeStamp;
  finishedAt?: TTimeStamp;
}

export interface IMsg {
  line: number;
  msg: string;
}
