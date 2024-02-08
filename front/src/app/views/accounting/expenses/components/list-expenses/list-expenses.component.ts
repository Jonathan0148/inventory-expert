import { Component, Input, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ExpenseModel } from '../../../../../shared/interfaces/expense';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit {

  @Input() expensesList:ExpenseModel[];
  @Input() orderColumn:any;
  @Input() displayData:any;
  @Input() loading:boolean; 

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
  ) 
  {}

  ngOnInit(): void {
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {

    this._crudSvc.deleteRequest(`/expenses/destroy/${id}`)
    .subscribe(res => {
      this._crudSvc.requestEvent.emit('deleted')
    })
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

}
