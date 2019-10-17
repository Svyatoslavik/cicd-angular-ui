import { Component, OnInit } from '@angular/core';
import { IAppStoreState } from 'src/app/core/store/store.state';
import { Store } from '@ngrx/store';
import {
  startNewBuildAction,
  loadBuildsListAction,
  selectBuildsList,
  selectBuildsLoading
} from 'src/app/core/store/builds-store';

import { IBuildModel } from 'src/app/core/models/ibuild.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builds-list',
  templateUrl: './builds-list.component.html',
  styleUrls: ['./builds-list.component.scss']
})
export class BuildsListComponent implements OnInit {
  public buildsList$: Observable<IBuildModel[]>;
  public loading$: Observable<boolean>;

  constructor(private readonly store: Store<IAppStoreState>) { }

  ngOnInit() {
    // @TODO: just to simplify, need to replace to real pagination
    this.store.dispatch(loadBuildsListAction({ limit: 1000, offset: 0}));

    this.buildsList$ = this.store.select(selectBuildsList);
    this.loading$ = this.store.select(selectBuildsLoading);
  }

  startNewBuild() {
    this.store.dispatch(startNewBuildAction());
  }

}
