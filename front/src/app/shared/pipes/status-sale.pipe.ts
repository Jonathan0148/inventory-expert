import { Pipe, PipeTransform } from '@angular/core';
import { StatusService } from '../../views/accounting/sales/services/status.service';
import { StatusModel } from '../interfaces/status';

@Pipe({
  name: 'statusSale'
})
export class StatusSalePipe implements PipeTransform {
  
  status:StatusModel[] = this._statusSvC.get();
   
  constructor(
    private _statusSvC: StatusService,
  ) {}


  transform(value: number): StatusModel {
    return this.status.filter(e => e.value == value)[0];
  }

}
