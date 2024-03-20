import { Injectable } from '@angular/core';
import { StatusModel } from '../../../../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {
  measurementUnitList:StatusModel[] = [
    { label: 'Cantidad', value: 0 },
    { label: 'Libra', value: 1 },
    { label: 'Kilo', value: 2 },
  ];

  constructor() { }

  public get():StatusModel[] {
    return this.measurementUnitList;
  }
}