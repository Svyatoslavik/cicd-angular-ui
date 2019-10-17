import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppStoreState } from 'src/app/core/store/store.state';
import {
  selectBuildsLoading,
  selectBuildByUrl,
  selectBuildIdByUrl,
} from 'src/app/core/store/builds-store';
import { IBuildModel } from 'src/app/core/models/ibuild.model';
import { first, filter, map } from 'rxjs/operators';
import {
  selectBuildStepsByUrl,
  selectBuildStepsError,
  selectBuildStepLoading
} from 'src/app/core/store/build-steps-store/build-steps-store.selector';
import { IStep } from 'src/app/core/models/istep.model';
import {
  loadBuildStepsListAction,
  loadOneBuildStepAction
} from 'src/app/core/store/build-steps-store/build-steps-store.actions';
import { IStepMsgModel } from './istep-msg.model';
import { IStepMessageMsg } from 'src/app/core/models/ibuild-update-msg.model';
import { BuildLoaderService } from 'src/app/core/loaders/abstract/build-loader.service';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit {
  public loading$: Observable<boolean>;
  public loadingStep$: Observable<boolean>;
  public error$: Observable<string>;

  public build$: Observable<IBuildModel>;
  public steps$: Observable<IStep[]>;
  public msgStream$: Observable<IStepMsgModel>;

  constructor(
    private readonly store: Store<IAppStoreState>,
    private readonly loader: BuildLoaderService,
    ) { }

  ngOnInit() {
    this.loading$ = this.store.select(selectBuildsLoading);
    this.loadingStep$ = this.store.select(selectBuildStepLoading);
    this.error$ = this.store.select(selectBuildStepsError);
    this.build$ = this.store.select(selectBuildByUrl);
    this.steps$ = this.store.select(selectBuildStepsByUrl);
    this.msgStream$ = this.loader.messagesStream().pipe(
      filter(({ type }) => 'stepMessage' === type),
      map(({ stepId, message: msg, line }: IStepMessageMsg) => ({ stepId, msg, line })));

    // trigger reloading build data
    this.store.select(selectBuildIdByUrl).pipe(first()) // there are no need takeUntil because we get only first value
      .subscribe(buildId => this.store.dispatch(loadBuildStepsListAction({ buildId })));
  }

  public onRequestLoadLogs({ stepId, from, to }: { stepId: string, from: number, to: number }) {
    this.store.dispatch(loadOneBuildStepAction({
      stepId,
      logsFrom: from,
      logsTo: to
    }));
  }
}
