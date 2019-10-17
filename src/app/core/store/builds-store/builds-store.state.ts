import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IBuildModel } from '../../models/ibuild.model';

export const buildsAdapter = createEntityAdapter<IBuildModel>({
  selectId: ({ id }: IBuildModel) => id,
});

export interface IBuildsState extends EntityState<IBuildModel> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialBuildsState: IBuildsState = buildsAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});
