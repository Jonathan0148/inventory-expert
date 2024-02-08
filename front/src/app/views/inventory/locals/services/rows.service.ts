import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LocalModel } from '../../../../shared/interfaces/local';

@Injectable({
  providedIn: 'root'
})
export class RowsService {

  public rowSelected$ = new Subject<LocalModel>();
  public rowLists$ = new Subject<LocalModel>();

  constructor() {}

  public getRow$(): Observable<LocalModel> {
    return this.rowSelected$.asObservable();
  }

  public setRow$(row:LocalModel): void{
    return this.rowSelected$.next(row);
  }

  public setListRow$(row:LocalModel): void{
    return this.rowLists$.next(row);
  }
}
