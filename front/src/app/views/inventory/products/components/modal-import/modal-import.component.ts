import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../../../../../shared/services/notifications.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductsImportService } from '../../services/products-import.service';
import { ModalListProductsNoImportsComponent } from '../modal-list-products-no-imports/modal-list-products-no-imports.component';

@Component({
  selector: 'app-modal-import',
  templateUrl: './modal-import.component.html',
  styleUrls: ['./modal-import.component.scss']
})
export class ModalImportComponent implements OnInit {
  form:FormGroup;
  validExtensions: string[] = ['xls', 'xlsx'];
  file: any;
  isSpinning:boolean = false;

  constructor(
    private notification: NotificationsService,
    private formBuilder: FormBuilder,
    private _crudSvc:CrudServices,
    private modalService: NzModalService,
    private _productSvc:ProductsImportService
  ) { 
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      file:[null,[Validators.required]],
    });
  }

  public submit(): void {
    this.isSpinning = true;
  
    const body = new FormData();
    body.append('myFile', this.file.fileRaw, this.file.fileName)

    this._crudSvc.postDataRequest('/products/importExcel', body).pipe(finalize( () => {
        this.isSpinning = false;  
        this._crudSvc.requestEvent.emit('');
     })).subscribe( res => {
        const { data } = res;
        
        this._productSvc.setProduct$(data?.productsNoSaved);
        this._productSvc.setRowImported$(data?.rowsSaved);
        
        this.openModalListsProducts();
     }, error => {
        console.warn('ERROR => ', error);
        return this.notification.warning('Atención', 'Los productos no pudierón ser importados','top');
     })
  }

  private openModalListsProducts(): void {
    this.modalService.closeAll();
    this.modalService.create({
      nzTitle: 'Resumen',
      nzContent: ModalListProductsNoImportsComponent,
      nzClosable: true,
      nzWidth: '70%'
    });
  }


  uploadFile(event: any) {
    const [file] = event.target.files

    if (!file) return
    const { name } = file;
    const fileExtension = name.split('.').pop();

    if (!this.validExtensions.includes(fileExtension)) {
      this.notification.warning('Extensión no válida', `Los formatos admitidos son ${this.validExtensions.join(', ')}`,'top');
      this.form.reset(); 
      return
    }
  
    this.file = {
      fileRaw: file,
      fileName: file.name
    }
  }
}
