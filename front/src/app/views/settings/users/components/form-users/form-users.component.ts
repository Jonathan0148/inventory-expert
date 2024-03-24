import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { TypeDocumentsService } from '../../services/type-documents.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalAvatarComponent } from '../modal-avatar/modal-avatar.component';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  id: number;

  isProfile: boolean = false;
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
  edit = false;
  isDetail: boolean = false;
  basicLicense: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _crudSvc:CrudServices,
    private _typeDocumentsSvC: TypeDocumentsService,
    private _statusSvC: StatusService,
    private msg: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getUser();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
    this.validateProfile();
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_id: [ 1, [ Validators.required ] ],
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
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/settings/users/edit/${this.id}` : `/settings/users/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        if (this.id) this._crudSvc.requestEvent.emit('updated')
        this.router.navigate(['/', 'usuarios']);
      }
    })
  }

  ngOnDestroy() {}

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
      `?page=${this.pageStore}`,
      `&term=${this.termStore}`
    ].join('');
    
    if( this.lastPageStore && ((this.lastPageStore < this.pageStore) && !this.termStore) ) return
    
    this._crudSvc.getRequest(`/settings/stores/availableLocals${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termStore) ? this.storesList = [...this.storesList,  ...data.data] : this.storesList = data.data;
        this.lastPageStore = data.last_page;
        this.pageStore++;
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
  
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Solo puedes subir archivos JPG o PNG!');
        observer.complete();
        return;
      }
      const isLt5M = file.size! / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.msg.error('La imagen debe tener menos de 5 MB.!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt5M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.loading = false;
        const imageUrl = info.file.response.url;
        this.avatarUrl = imageUrl;
        this.form.patchValue({ avatar: imageUrl });
        break;
      case 'error':
        this.msg.error('Error de red');
        this.loading = false;
        break;
    }
  }

  public onSearchRole(event:string){
    this.termRole = event;
    this.getRoles();
    this.setPage();

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

  private validateProfile(){
    this._crudSvc.getRequest(`/settings/users/getUser`).subscribe((res: any) => {
      const { data } = res;
      if (data.id == this.id) this.isProfile = true;
    })
  }

  public openModalAvatar(tplFooter: TemplateRef<{}>){
    const modalRef = this.modalService.create({
      nzTitle: 'Seleccionar avatar',
      nzContent: ModalAvatarComponent,
      nzClosable: true,
      nzFooter: tplFooter
    });

    modalRef.afterClose.subscribe((avatarUrl: string) => {
      this.avatarUrl = avatarUrl;
      this.form.patchValue({ avatar: avatarUrl });
    });
  }

  private validateLocal(){
    this._crudSvc.getRequest(`/settings/stores/validateLocal`).subscribe((res: any) => {
      const { data } = res;
      if (data == 1) this.basicLicense = true; 
    })
  }
}