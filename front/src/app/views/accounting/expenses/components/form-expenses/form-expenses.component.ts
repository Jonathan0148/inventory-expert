import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';

@Component({
  selector: 'app-form-expenses',
  templateUrl: './form-expenses.component.html',
  styleUrls: ['./form-expenses.component.scss']
})
export class FormExpensesComponent implements OnInit {

  @Input() id:number;

  form: FormGroup;
  loading:boolean;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        description: [ null, [ Validators.required ] ],
        value: [ null, [ Validators.required, Validators.maxLength(20)] ],
    });
    
    if(this.id) this.getExpense();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/expenses/update/${this.id}` : `/expenses/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contabilidad','gastos']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getExpense(){
    this._crudSvc.getRequest(`/expenses/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }
}