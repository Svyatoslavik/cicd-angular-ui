import { Observable } from 'rxjs';
import { IBuildModel } from '../../models/ibuild.model';
import { IStep } from '../../models/istep.model';
import { TBuildUpdateMsg } from '../../models/ibuild-update-msg.model';

export abstract class BuildLoaderService {
  public abstract loadBuildsList(limit: number, offset: number): Observable<IBuildModel[]>;
  public abstract loadBuildById(buildId: number): Observable<IBuildModel>;
  public abstract loadBuildStepsList(buildId: number): Observable<IStep[]>;
  public abstract loadStepWithLogs(stepId: string, logsFrom: number, logsTo: number): Observable<IStep>;
  public abstract startNewBuild(): Observable<number>;
  public abstract messagesStream(): Observable<TBuildUpdateMsg>;
}
