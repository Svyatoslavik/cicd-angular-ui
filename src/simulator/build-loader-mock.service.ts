import { IBuildModel } from '../app/core/models/ibuild.model';
import { Observable, of, Subscription, Subject, throwError } from 'rxjs';
import { TBuildUpdateMsg } from 'src/app/core/models/ibuild-update-msg.model';

import BUILD_MOCK from '../build-log.mock.json';
import { translateStepsToSimCmdsList } from './simulator';
import { TSimCmd } from './types';
import { delay } from 'rxjs/operators';
import { ISimBuildModel, ISimStep } from './sim-build.model';
import { IStep } from 'src/app/core/models/istep.model';
import { BuildLoaderService } from 'src/app/core/loaders/abstract/build-loader.service';

/**
 * This is a part of simulator (this service simulate server side)
 * This class should simulate server side with keeping build state
 * Also this simulate websockets connection by messagesStream() method
 */

export class BuildLoaderMock extends BuildLoaderService {
  private readonly messagesStream$: Subject<TBuildUpdateMsg> = new Subject();
  private readonly buildsList: ISimBuildModel[] = [];
  private readonly stepsMap: {
    [stepId: string]: ISimStep;
  } = {};


  private simulatorSubs: Subscription;

  public loadBuildsList(limit: number, offset: number): Observable<IBuildModel[]> {
    return of(
      this.buildsList
        .reverse()
        .slice(offset, offset + limit)
        .map(mapSimBuildToBuild)
    ).pipe(delay(1000));
  }

  public loadBuildById(buildId: number): Observable<IBuildModel> {
    const build = this.getBuildById(buildId);
    return build ? of(mapSimBuildToBuild(build)) : throwError('Build not found');
  }

  public loadBuildStepsList(buildId: number): Observable<IStep[]> {
    const build = this.getBuildById(buildId);
    if (build) {
      return of(build.steps.map(id => {
        const { status, name, startedAt, finishedAt, logs } = this.stepsMap[id];
        return { id, buildId, status, name, startedAt, finishedAt, logs: [], logsTo: 0, logsFrom: 0, logsTotal: logs.length };
      }));
    }
    return throwError('Build not found');
  }

  public loadStepWithLogs(stepId: string, logsFrom: number, logsTo: number): Observable<IStep> {
    const step = this.stepsMap[stepId];
    if (step) {
      let logsList = [];
      if (!logsFrom && !logsTo) {
        logsList = [ ...step.logs];
      } else {
        logsList = step.logs.slice(logsFrom, logsTo);
      }
      return of({
        ...step,
        logsFrom,
        id: getStepId(step.buildId, step.name),
        logs: logsList,
        logsTo: logsFrom + logsList.length,
        logsTotal: step.logs.length
      });
    }
    return throwError('Step not found');
  }

  public startNewBuild(): Observable<number> {
    return new Observable((observer) => {
      if (this.simulatorSubs) {
        this.simulatorSubs.unsubscribe();
        this.abortBuild(this.getLastBuild());
      }
      const newBuild = this.createNewBuild(this.nextBuildId(), BUILD_MOCK.steps.map(({ name }) => name));
      this.buildsList.push(newBuild);
      this.simulatorSubs = translateStepsToSimCmdsList(BUILD_MOCK.steps)
        .subscribe(this.handleSimCommand.bind(this, newBuild));

      observer.next(newBuild.id);
    });
  }

  public messagesStream(): Observable<TBuildUpdateMsg> {
    return this.messagesStream$;
  }

  private getBuildById(buildId: number): ISimBuildModel {
    return this.buildsList[buildId - 1];
  }

  private handleSimCommand(build: ISimBuildModel, cmd: TSimCmd) {
    // console.log('handle', build, cmd)
    const cmdType = cmd.type;
    let line = 0;
    switch (cmd.type) {
      case 'buildStatus':
        build.status = cmd.status;
        break;
      case 'stepStatus':
        this.stepsMap[getStepId(build.id, cmd.stepName)].status = cmd.status;
        break;
      case 'stepMessage':
        this.stepsMap[getStepId(build.id, cmd.stepName)].logs.push(cmd.message);
        line = this.stepsMap[getStepId(build.id, cmd.stepName)].logs.length;
        break;
      default:
        throw new Error(`Unsupported command type '${cmdType}'`);
    }
    this.emitMessage(translateCommand(build.id, cmd, line));
  }

  private createNewBuild(id: number, listOfSteps: string[]): ISimBuildModel {
    const genStepId = getStepId.bind(null, id);
    listOfSteps.forEach(stepName => {
      this.stepsMap[genStepId(stepName)] = createEmptyStep(id, stepName);
    });
    return {
      id,
      startedAt: nowTimestamp(),
      status: 'pending',
      steps: listOfSteps.map(genStepId),
    };
  }

  private nextBuildId(): number {
    return this.buildsList.length + 1;
  }

  private abortBuild(build: ISimBuildModel) {
    if (build.status !== 'inprogress') {
      return;
    }
    build.steps.forEach(stepId => {
      const stepDetails = this.stepsMap[stepId];
      switch (stepDetails.status) {
        case 'inprogress':
          stepDetails.status = 'aborted';
          break;
        case 'pending':
          stepDetails.status = 'canceled';
          break;
        default:
          return;
      }
      this.emitMessage({ stepId, type: 'stepStatus', status: stepDetails.status});
    });
    build.status = 'aborted';
    this.emitMessage({ buildId: build.id, type: 'buildStatus', status: build.status });
  }

  private getLastBuild(): ISimBuildModel {
    return this.buildsList[this.buildsList.length - 1];
  }

  private emitMessage(message: TBuildUpdateMsg) {
    this.messagesStream$.next(message);
  }
}

function getStepId(buildId: number, stepName: string): string {
  return `${buildId}#${stepName}`;
}

function translateCommand(buildId: number, simCmd: TSimCmd, line: number): TBuildUpdateMsg {
  switch (simCmd.type) {
    case 'stepMessage':
        return {
          line,
          stepId: getStepId(buildId, simCmd.stepName),
          ...simCmd
        };
    case 'stepStatus':
      return {
        stepId: getStepId(buildId, simCmd.stepName),
        ...simCmd
      };
    default:
      return {
        buildId,
        ...simCmd
      };
  }
}

// get current timestamp
function nowTimestamp() {
  return new Date().getTime();
}

function createEmptyStep(buildId: number, name: string): ISimStep {
  return {
    buildId,
    name,
    status: 'pending',
    logs: [],
  };
}
function mapSimBuildToBuild(build: ISimBuildModel): IBuildModel {
  return {
    ...build
  };
}
