import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IStep } from 'src/app/core/models/istep.model';
import { IStepMsgModel } from '../../istep-msg.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-steps-list-view',
  templateUrl: './steps-list-view.component.html',
  styleUrls: ['./steps-list-view.component.scss']
})
export class StepsListViewComponent implements OnInit {
  @Input()
  public stepsList: IStep[];

  @Input()
  public msgStream$: Observable<IStepMsgModel>;

  @Input()
  loading: boolean;

  @Output()
  public requestLoadLogs: EventEmitter<{ stepId: string, from: number, to: number }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public trackByName(i, step: IStep) {
    return step.name;
  }

  public onRequestLoadLogs(stepId: string, event: { from: number, to: number }) {
    this.requestLoadLogs.emit({ stepId, ...event});
  }

}
