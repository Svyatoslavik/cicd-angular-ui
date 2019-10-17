import { defer, concat, of, Observable, animationFrameScheduler } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TSimCmd } from './types';
const MAX_STEP_TIME = 60 * 1000; // time in ms
const MAX_MSG_DELAY = 1000;
export function translateStepsToSimCmdsList(
  stepsList: { name: string, logs: string[] }[]): Observable<TSimCmd> {

    return concat(
      of<TSimCmd>({ type: 'buildStatus', status: 'inprogress' }),
      ...stepsList.map(({ name: stepName, logs  }) =>  defer(() => {
        const stepInProgress$ = of<TSimCmd>({ stepName, type: 'stepStatus', status: 'inprogress' });
        const stepSuccess$ = of<TSimCmd>({ stepName, type: 'stepStatus', status: 'success' });
        if (logs && logs.length) {
          const messageDelay = Math.min(MAX_STEP_TIME / logs.length, MAX_MSG_DELAY);
          return concat(
            stepInProgress$,
            ...logs.map(message =>
              defer(() =>
              of<TSimCmd>({ stepName, message: message.replace(/(\r\n|\n|\r)/gm, ''), type: 'stepMessage' })
                .pipe(delay(messageDelay * Math.random())))),
            stepSuccess$,
          );
        }
        return concat(
          stepInProgress$,
          stepSuccess$,
        );
      })),
      of<TSimCmd>({ type: 'buildStatus', status: 'success' }),
    );
}
