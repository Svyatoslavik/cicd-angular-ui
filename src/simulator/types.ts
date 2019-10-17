import { TBuildStatus } from 'src/app/core/types/types';

interface IBuildStatusChangeCmd {
  // buildId: number;
  type: 'buildStatus';
  status: TBuildStatus;
}

interface IStepStatusChangeCmd {
  // buildId: number;
  stepName: string;
  type: 'stepStatus';
  status: TBuildStatus;
}

interface IStepMessageCmd {
  // buildId: number;
  stepName: string;
  type: 'stepMessage';
  message: string;
}

export type TSimCmd = IBuildStatusChangeCmd | IStepStatusChangeCmd | IStepMessageCmd;
