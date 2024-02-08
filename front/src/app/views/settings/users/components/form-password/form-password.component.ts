import { Component, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { ValidationsForm } from '../../validations/validations-form';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent implements OnInit {
 
  @Input() id:number;
  loading:boolean;
  changePWForm: FormGroup;
  same:boolean;

  constructor(
    private fb: FormBuilder, 
    private modalService: NzModalService, 
    private crudSvc: CrudServices,
    private message: NzMessageService,
  ) { }
  
  ngOnInit(): void {
    this.changePWForm = this.fb.group({
        oldPassword: [ null, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ],
        password_confirmation: [ null, [ Validators.required] ]
    },
    {
      validator: ValidationsForm.match('password', 'password_confirmation', 'password-mismatch')
    });
  }

  showConfirm(): void {
      this.modalService.confirm({
        nzTitle: '¿Está seguro de realizar esta acción?',
        nzOnOk: () => this.submit()
      });
  }
  
  public submitForm(): void {
    
      for (const i in this.changePWForm.controls) {
          this.changePWForm.controls[ i ].markAsDirty(); this.changePWForm.controls[ i ].updateValueAndValidity();
      }
      this.showConfirm();
  }

  private submit(): void {
    this.loading = true;
    this.crudSvc.putRequest('/users/changePassword', {id: this.id ,...this.changePWForm.value})
        .pipe((finalize(() => this.loading = false)))
        .subscribe((res:any) => {
          const { success } = res;
          if(success){
            console.log('creado');
          }
    })
  }


  public onChangePassword(value:string):void{
    if(!value) return
    this.loading = true;
    this.crudSvc.postRequest('/users/validatePassword', {id: this.id,password: value})
        .pipe((finalize(() => this.loading = false)))
        .subscribe((res:any) => {
          const { success } = res;
          if(!success) this.changePWForm.get('oldPassword').setErrors({'incorrect': true})
    })
  }

}
