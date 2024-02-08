import { Injectable } from '@angular/core';
import { StatusModel } from '../../../../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusList:StatusModel[] = [
    { label: 'Sin stock', value: 'out-stock' },
    { label: 'Disponible', value: 'in-stock' },
    { label: 'Bajo stock', value: 'low-stock' },
  ];

  constructor() { }

  public get():StatusModel[] {
    return this.statusList;
  }

}
