import { Component, OnInit, Input } from '@angular/core';
import { IBuildModel } from 'src/app/core/models/ibuild.model';

@Component({
  selector: 'app-builds-list-view',
  templateUrl: './builds-list-view.component.html',
  styleUrls: ['./builds-list-view.component.scss']
})
export class BuildsListViewComponent implements OnInit {
  @Input()
  list: IBuildModel[];

  constructor() { }

  ngOnInit() {
  }

  trackById(idx, item: IBuildModel) {
    return item.id;
  }

}
