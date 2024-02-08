import { Injectable } from '@angular/core';
import { LocalModel } from '../../../../shared/interfaces/local';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  public columnSelected$ = new Subject<LocalModel>();
  public columnLists$ = new Subject<LocalModel>();
  
  constructor() {}

  public getColumn$(): Observable<LocalModel> {
    return this.columnSelected$.asObservable();
  }

  public setColumn$(column:LocalModel): void{
    return this.columnSelected$.next(column);
  }

  public setListColumn$(column:LocalModel): void{
    return this.columnLists$.next(column);
  }

}
