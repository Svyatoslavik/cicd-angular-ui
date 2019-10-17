import { TBuildStatus } from '../types/types';

export interface IBuildStatusMsg {
  buildId: number;
  type: 'buildStatus';
  status: TBuildStatus;
}

export interface IStepStatusMsg {
  stepId: string;
  type: 'stepStatus';
  status: TBuildStatus;
}

export interface IStepMessageMsg {
  stepId: string;
  type: 'stepMessage';
  message: string;
  line: number;
}

export type TBuildUpdateMsg = IBuildStatusMsg | IStepStatusMsg | IStepMessageMsg;
