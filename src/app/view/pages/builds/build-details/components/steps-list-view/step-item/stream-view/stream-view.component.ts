import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { IStep } from 'src/app/core/models/istep.model';
import { IStepMsgModel } from '../../../../istep-msg.model';
import { filter, takeUntil, throttleTime, debounceTime, delay, auditTime, exhaustMap } from 'rxjs/operators';


const MSG_HEIGHT = 24;
const OVERSCAN = 50;
const MSGS_TROTTLE_TIME = 250;
const SCROLL_DELAY  = 50;
const REDRAW_DELAY  = 50;

@Component({
  selector: 'app-step-steam-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.scss']
})
export class StepStreamViewComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public step: IStep;

  @Input()
  public msgStream$: Observable<IStepMsgModel>;

  @Input()
  public loading: boolean;

  @Output()
  public requestLoadLogs: EventEmitter<{ from: number, to: number }> = new EventEmitter();

  @ViewChild('container', { static: true })
  public conatainer: ElementRef<HTMLElement>;

  public msgsFrame: {idx: number, text: string }[];

  private collectedStreamMsgs: string[] = [];
  private streaMsgsStartFrom = 0; // unspecified

  private onDestroy$: Subject<void> = new Subject();

  private curStepMsgs$: Observable<IStepMsgModel>;


  private handleScrollbind;
  private preventScrollEvent = false;

  private askRedraw$: Subject<void> = new Subject();
  private scrollDown$: Subject<void> = new Subject();

  constructor(private chRef: ChangeDetectorRef, private zone: NgZone) { }

  ngOnInit() {
    this.requestLoadLogs.emit({ from: 0, to: 0}); // load all logs
    this.curStepMsgs$ = this.msgStream$.pipe(
      filter(({ stepId }) => stepId === this.step.id));

    this.curStepMsgs$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(({ msg, line }: IStepMsgModel) => {
      if (!this.streaMsgsStartFrom) {
        this.streaMsgsStartFrom = line; // keep line when we started listening
      }
      this.collectedStreamMsgs.push(msg); // remove new lines chars
    });
    this.curStepMsgs$.pipe(
      // Unfortunately "trottleTime" and "audditTime" can skip latest value, so here need use next solution:
      exhaustMap(() => timer(MSGS_TROTTLE_TIME)),
      takeUntil(this.onDestroy$))
    .subscribe(() => {
      const totalMsgs = this.step.logsTo + this.collectedStreamMsgs.length;
      const pageCapacity = Math.ceil(this.conatainer.nativeElement.clientHeight / MSG_HEIGHT) + OVERSCAN;
      this.setMsgFrame({ from: totalMsgs - pageCapacity, to: totalMsgs });
      this.synchronize();
      this.chRef.detectChanges();
      this.scrollDown$.next();
    });
    this.synchronize();
    this.handleScrollbind = this.handleScroll.bind(this);

    this.subscribeScroll();

    this.askRedraw$.pipe(
      // Unfortunately "trottleTime" and "audditTime" can skip latest value, so here need use next solution:
      takeUntil(this.onDestroy$),
      exhaustMap(() => timer(MSGS_TROTTLE_TIME)),
    ).subscribe(() => {
      this.setMsgFrame(
        this.calcMsgsFrameBorder(
          this.conatainer.nativeElement.scrollTop,
          this.conatainer.nativeElement.clientHeight));
      this.chRef.detectChanges();
    });
    this.scrollDown$.pipe(
      delay(SCROLL_DELAY),
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this.zone.runOutsideAngular(() => {
        this.preventScrollEvent = true;
        this.conatainer.nativeElement.scrollTop = this.conatainer.nativeElement.scrollHeight;
      });
    });
  }

  ngOnChanges(): void {
    this.askRedraw$.next();
  }

  getMsgStyle({ idx }) {
    return {
      height: MSG_HEIGHT + 'px',
      position: 'absolute',
      top: idx * MSG_HEIGHT + 'px',
    };
  }

  trackByIdx(i, {idx}) {
    return idx;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.unsubscribeScroll();
  }

  private subscribeScroll() {
    this.zone.runOutsideAngular(() => {
      this.conatainer.nativeElement.addEventListener('scroll', this.handleScrollbind);
    });
  }

  private unsubscribeScroll() {
    this.conatainer.nativeElement.removeEventListener('scroll', this.handleScrollbind);
  }

  private synchronize() {
    if (this.loading) {
      return;
    }

    if (!this.step.logs.length && !this.streaMsgsStartFrom) {
      this.requestLoadLogs.emit({ from: 0, to: 0}); // load all logs
      // console.log('run 1 0 0');
    } else if (this.streaMsgsStartFrom > 1 && this.step.logsTo !== this.streaMsgsStartFrom - 1) {
      // console.log('run 2', 0, this.streaMsgsStartFrom - 1);
      this.requestLoadLogs.emit({ from: 0, to: this.streaMsgsStartFrom - 1 });
    }

    // console.log('this.synchronize stream from', this.streaMsgsStartFrom, 'len', this.step.logs.length, 'step logs to', this.step.logsTo);
  }

  private handleScroll(el: HTMLElement, e) {
    if (this.preventScrollEvent) {
      this.preventScrollEvent = false;
      return;
    }
    this.askRedraw$.next();
    // console.log('handleScroll', el, e);
  }

  private calcMsgsFrameBorder(scrollTop: number, viewHeight: number): { from: number, to: number } {
    return {
      from: Math.max(Math.floor(scrollTop / MSG_HEIGHT) - OVERSCAN, 0),
      to: Math.ceil((scrollTop + viewHeight) / MSG_HEIGHT) + OVERSCAN,
    };
  }

  private setMsgFrame({ from, to }: { from: number, to: number }) {
    const msgsList = [...this.step.logs, ...this.collectedStreamMsgs];

    from = from < 0 ? 0 : from; // normalie
    to = to < 0 ? 0 : to; // normalie

    this.msgsFrame = msgsList.slice(from, to).map((val, i) => ({
      idx: from + i,
      text: val,
    }));
    if (to < msgsList.length ) {
      this.msgsFrame.push({
        idx: msgsList.length,
        text: msgsList[msgsList.length - 1]
      });
    }
    // console.log('msgframe', this.msgsFrame);
  }
}
