import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, UntypedFormGroup, FormBuilder } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { RowsService } from '../../services/rows.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-rows',
  templateUrl: './form-rows.component.html',
  styleUrls: ['./form-rows.component.scss']
})
export class FormRowsComponent implements OnInit, OnDestroy {
  id:number;
  @Input() section:any;
  
  listSubscribers: Subscription[] = [];
  idRow:number | boolean;
  form: UntypedFormGroup;
  loading:boolean;
  isDetail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private _rowSvc:RowsService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        name: [ null, [ Validators.required ] ],
        shelf_id: [ this.id, [ Validators.required] ],
    });

    this.listenObserver();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.idRow ? `/inventory/distribution-local/rows/edit/${this.idRow}` : `/inventory/distribution-local/rows/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this._rowSvc.setListRow$(this.form.value);
        this.setForm();
      }
    })
  }

  private setForm(){
    this.idRow = null;
    this.form.reset()
    this.form.patchValue({shelf_id: this.id})
  }

  private listenObserver = () => {
    const observer1$ = this._rowSvc.rowSelected$.subscribe((res) => {
      this.form.patchValue(res);
      this.idRow = res?.id;
    })
  
    this.listSubscribers = [observer1$];
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
}
