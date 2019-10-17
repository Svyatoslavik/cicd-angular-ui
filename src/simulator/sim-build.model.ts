import { TTimeStamp, TBuildStatus } from 'src/app/core/types/types';

export interface ISimBuildModel {
  id: number;
  status: TBuildStatus;
  startedAt?: TTimeStamp;
  finishedAt?: TTimeStamp;
  steps: string[]; // list of staps ids
}

export interface ISimStep {
  buildId: number;
  name: string;
  status: TBuildStatus;
  logs: string[];
  startedAt?: TTimeStamp;
  finishedAt?: TTimeStamp;
}
