import { Component, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { TypeDocumentsService } from '../../services/type-documents.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  @Input() id:number;

  serverURL: string = environment.serverUrl;
  form: FormGroup;
  avatarUrl: string = "";
  rolesList: RoleModel[] = [];
  pageRole: number = 1;
  termRole: string = '';
  lastPageRole: number;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  typeDocumentsList = this._typeDocumentsSvC.get();
  statusList = this._statusSvC.get();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _crudSvc:CrudServices,
    private _typeDocumentsSvC: TypeDocumentsService,
    private _statusSvC: StatusService,
    private msg: NzMessageService
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_id: [ null, [ Validators.required ] ],
        role_id: [ null, [ Validators.required ] ],
        names: [ null, [ Validators.required ] ],
        surnames: [ null, [ Validators.required ] ],
        type_document: [ 0, [ Validators.required ] ],
        document: [ null, [ Validators.required ] ],
        email: [ null, [ Validators.required, Validators.email ] ],
        state: [ 1, [ Validators.required ]],
        avatar: [ null, []]
    });

    if(this.id) this.getUser()
    this.getStores();
    this.getRoles();
  }
  
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Solo puedes subir archivos JPG o PNG!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('La imagen debe tener menos de 2 MB.!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.form.patchValue({avatar:img});
        });
        break;
      case 'error':
        this.msg.error('Error de red');
        this.loading = false;
        break;
    }
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/settings/users/edit/${this.id}` : `/settings/users/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'usuarios']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getUser(){
    this._crudSvc.getRequest(`/settings/users/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
      this.avatarUrl = data.avatar;
    })
  }

  public getStores():void {
    const query = [
      `?page=${this.pageRole}`,
      `&term=${this.termRole}`
    ].join('');
    
    if( this.lastPageRole && ((this.lastPageRole < this.pageRole) && !this.termRole) ) return
    
    this._crudSvc.getRequest(`/settings/stores/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termRole) ? this.storesList = [...this.storesList,  ...data.data] : this.rolesList = data.data;
        this.lastPageRole = data.last_page;
        this.pageRole++;
    })
  }

  public getRoles():void {
    const query = [
      `?page=${this.pageRole}`,
      `&term=${this.termRole}`
    ].join('');
    
    if( this.lastPageRole && ((this.lastPageRole < this.pageRole) && !this.termRole) ) return

    this._crudSvc.getRequest(`/settings/roles/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termRole) ? this.rolesList = [...this.rolesList,  ...data.data] : this.rolesList = data.data;
        this.lastPageRole = data.last_page;
        this.pageRole++;
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------

  public onSearchRole(event:string){

    if(event.length > 3) {
      this.termRole = event;
      this.getRoles();
      this.setPage();
    }

    if(!event.length && this.termRole) {
      this.setPage();
      this.termRole = '';
      this.rolesList = []
      this.getRoles();
    }  
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------

  private setPage = ():number => this.pageRole = 1; 
}
