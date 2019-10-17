import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { FEATURE_ROUTER } from './const';
import { IAppStoreState } from '../store.state';

export const selectRouter = createFeatureSelector<
  IAppStoreState,
  fromRouter.RouterReducerState<any>
>(FEATURE_ROUTER);

export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

// export const selectRouteId = selectRouteParam('id');
export const selectBuildId = selectQueryParam('buildId');
