import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../interfaces/job.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseService {


  addJob(data: IJob): Observable<IJob> {
    return this.post<IJob>('jobs', data);
  }


  getJobs(): Observable<IJob[]> {
    return this.get<IJob[]>('jobs');
  }
  editJob(id: number | undefined, data: IJob): Observable<IJob> {
    return this.put<IJob>(`jobs/${id}`, data);
  }

  getEachJob(id:number):Observable<IJob>{
    return this.get<IJob>(`jobs/${id}`)
  }

  deleteJob(id: number):Observable<IJob>{
    return this.delete<IJob>(`jobs/${id}`);
  }

}
