import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../../../../../shared/services/file.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { InvoicesModel } from '../../../../../shared/interfaces/invoices';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss']
})
export class ListInvoicesComponent implements OnInit {

  @Input() invoicesList:InvoicesModel[]; 
  @Input() orderColumn:any;
  @Input() loading:boolean;  

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
    private fileService: FilesService
  ) { }

  ngOnInit(): void {
    
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {

    this._crudSvc.deleteRequest(`/orders/destroy/${id}`)
    .subscribe(res => {
      this._crudSvc.requestEvent.emit('deleted')
    })
  }

  downloadInvoice(id:number): void {
    this.fileService.exportFile(`/orders/downloadInvoice/${id}`, 'Factura de compra');
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

}
