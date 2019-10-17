import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IStep } from 'src/app/core/models/istep.model';
import { IStepMsgModel } from '../../../istep-msg.model';



@Component({
  selector: 'app-step-item',
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.scss']
})
export class StepItemComponent {
  @Input()
  public step: IStep;

  @Input()
  public msgStream$: Observable<IStepMsgModel>;

  @Input()
  loading: boolean;

  @Output()
  public requestLoadLogs: EventEmitter<{ from: number, to: number }> = new EventEmitter();

}
