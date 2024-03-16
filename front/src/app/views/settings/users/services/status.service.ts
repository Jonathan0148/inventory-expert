import { Injectable } from '@angular/core';
import { StatusModel } from '../../../../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusList:StatusModel[] = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2 }
  ];

  public get():StatusModel[] {
    return this.statusList;
  }
}