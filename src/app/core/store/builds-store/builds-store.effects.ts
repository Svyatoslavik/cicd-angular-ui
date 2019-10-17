import { Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import {
  startNewBuildAction,
  startCIBuildsWatchingAction,
  loadBuildsListAction,
  loadBuildsListSuccessAction,
  loadBuildsListFailedAction,
  loadOneBuildAction,
  loadOneBuildSuccessAction,
  loadOneBuildFailedAction,
  updateBuildAction
} from './builds-store.actions';
import { switchMapTo, map, switchMap, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { IBuildStatusMsg } from '../../models/ibuild-update-msg.model';
import { BuildLoaderService } from '../../loaders/abstract/build-loader.service';

@Injectable()
export class BuildsEffects implements OnInitEffects {

  ciStatusWatching$ = createEffect(() => this.actions$.pipe(
    ofType(startCIBuildsWatchingAction),
    switchMapTo(this.buildLoader.messagesStream().pipe(
      filter(({ type }) => 'buildStatus' === type),
      map(({ buildId: id, status }: IBuildStatusMsg) => updateBuildAction({ update: {
        id,
        changes: { status }
      } }))))));

  startNewBuild$ = createEffect(() => this.actions$.pipe(
    ofType(startNewBuildAction),
    switchMapTo(this.buildLoader.startNewBuild().pipe(
      map(buildId => loadOneBuildAction({ buildId }))
    ))
  ));

  loadOne$ = createEffect(() => this.actions$.pipe(
    ofType(loadOneBuildAction),
    switchMap(({ buildId }) => this.buildLoader.loadBuildById(buildId).pipe(
      map(build => loadOneBuildSuccessAction({ build })),
      catchError((error) => of(loadOneBuildFailedAction({ error }))
    )))
  ));

  loadList$ = createEffect(() => this.actions$.pipe(
    ofType(loadBuildsListAction),
    switchMap(({limit, offset }) => this.buildLoader.loadBuildsList(limit, offset).pipe(
      map(buildsList => loadBuildsListSuccessAction({ buildsList })),
      catchError((error) => of(loadBuildsListFailedAction({ error }))
    )))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly buildLoader: BuildLoaderService) {}

  ngrxOnInitEffects(): Action {
    return startCIBuildsWatchingAction();
  }
}
