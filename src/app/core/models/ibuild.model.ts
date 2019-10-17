import { TTimeStamp, TBuildStatus } from '../types/types';

export interface IBuildModel {
  id: number;
  steps: string[]; // list of steps ids
  status: TBuildStatus;
  startedAt?: TTimeStamp;
  finishedAt?: TTimeStamp;
}

// export interface IBuildModel extends IBuildBaseModel {
//   steps: string[]; // list of staps names
//   stepsMap: {
//     [stepName: string]: IStep;
//   };
// }

// export interface IStep {
//   name: string;
//   status: TBuildStatus;
//   logs: string[];
//   startedAt?: TTimeStamp;
//   finishedAt?: TTimeStamp;
// }
