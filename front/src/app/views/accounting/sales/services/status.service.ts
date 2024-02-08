import { Injectable } from '@angular/core';
import { StatusModel } from '../../../../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }
  
  statusList:StatusModel[] = [
    { label: 'Pagada', value: 1, color: 'green' },
    { label: 'Abonada', value: 2, color: 'gold' },
  ];

  public get():StatusModel[] {
    return this.statusList;
  }

}
