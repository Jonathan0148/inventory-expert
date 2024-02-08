import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { ColumnsService } from '../../services/columns.service';

@Component({
  selector: 'app-form-columns',
  templateUrl: './form-columns.component.html',
  styleUrls: ['./form-columns.component.scss']
})
export class FormColumnsComponent implements OnInit {

  @Input() id:number;
  @Input() section:any;
  
  listSubscribers: Subscription[] = [];
  idColumn:number | boolean;
  form: UntypedFormGroup;
  loading:boolean;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private _columnSvc:ColumnsService,
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        name: [ null, [ Validators.required ] ],
        code: [ null, [ Validators.required] ],
        id_section: [ this.id, [ Validators.required] ],
    });

    this.listenObserver();
    this.getCount();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.idColumn ? `/local/columns/update/${this.idColumn}` : `/local/columns/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this._columnSvc.setListColumn$(this.form.value);
        this.setForm();
        this.getCount();
      }
    })
  }

  private setForm(){
    this.idColumn = null;
    this.form.reset()
    this.form.patchValue({id_section: this.id})
  }

  private listenObserver = () => {
    const observer1$ = this._columnSvc.columnSelected$.subscribe((res) => {
      this.form.patchValue(res);
      this.idColumn = res?.id;
    })
  
    this.listSubscribers = [observer1$];
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  private getCount():void {
    this._crudSvc.getRequest(`/local/columns/getCount`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue({ code: (data?.id ?? 0) + 1 })
    })
  }
}
