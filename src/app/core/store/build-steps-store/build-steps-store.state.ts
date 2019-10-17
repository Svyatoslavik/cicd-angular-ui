import { TBuildStatus } from '../../types/types';
import { IStep } from '../../models/istep.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';




export const buildStepsAdapter = createEntityAdapter<IStep>({
  selectId: ({ id }: IStep) => id,
});

export interface IBuildStepsState extends EntityState<IStep> {
  // buildId: number;
  loading: boolean;
  error: string;
}

export const initialBuildStepsState: IBuildStepsState = buildStepsAdapter.getInitialState({
  // buildId: null,
  loading: false,
  error: null,
});
