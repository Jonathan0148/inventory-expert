import { Component, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StatusService } from '../../services/status.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  
  @Input() id:number;

  form: FormGroup;
  avatarUrl: string = "";
  loading:boolean;
  typeDocumentsList:any;
  rolesList:RoleModel[] = [];
  pageRole:number = 1;
  termRole:string = '';
  lastPageRole:number;
  statusList = this._statusSvC.get();

  constructor(
    private fb: FormBuilder,
    private _statusSvC: StatusService,
    private _crudSvc:CrudServices,
    private router:Router
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        full_name: [ null, [ Validators.required ] ],
        email: [ null, [ Validators.required, Validators.email ] ],
        phone: [ null, [ Validators.required ] ],
        date_birth: [ null, [ Validators.required ] ],
        id_type_document:[ 1, [  Validators.required ]],
        document:[null, [ Validators.required ]],
        status:[null, [ Validators.required ]],
        id_role:[null, [ Validators.required ]],
    });

    if(this.id) this.getUser()
    this.getRoles();
    this.getTypeDocuments();
  }

  
  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
        this.avatarUrl = img;
    });
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/users/update/${this.id}` : `/users/create`;
        
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
    this._crudSvc.getRequest(`/users/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
  })
  }


  public getRoles():void {
    const query = [
      `?page=${this.pageRole}`,
      `&term=${this.termRole}`
    ].join('');
    
    if( this.lastPageRole && ((this.lastPageRole < this.pageRole) && !this.termRole) ) return

    this._crudSvc.getRequest(`/roles/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termRole) ? this.rolesList = [...this.rolesList,  ...data.data] : this.rolesList = data.data;
        this.lastPageRole = data.last_page;
        this.pageRole++;
    })
  }

  private getTypeDocuments():void {
    this._crudSvc.getRequest(`/users/getTypeDocuments`).subscribe((res: any) => {
        const { data } = res;
        this.typeDocumentsList = data;
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
