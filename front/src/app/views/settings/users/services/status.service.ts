import { Injectable } from '@angular/core';
import { StatusModel } from '../../../../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  statusList:StatusModel[] = [
    { label: 'Habilitado', value: 1 },
    { label: 'Deshabilitado', value: 0 },
  ];


  public get():StatusModel[] {
    return this.statusList;
  }

}
