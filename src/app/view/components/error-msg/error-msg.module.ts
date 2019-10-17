import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg.component';
import { ClarityModule } from '@clr/angular';



@NgModule({
  declarations: [ErrorMsgComponent],
  exports: [ErrorMsgComponent],
  imports: [
    CommonModule,
    ClarityModule,
  ]
})
export class ErrorMsgModule { }
