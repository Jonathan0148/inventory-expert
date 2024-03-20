import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id:number;
  @Input() section:any;
  
  listSubscribers: Subscription[] = [];
  idColumn:number | boolean;
  form: UntypedFormGroup;
  loading:boolean;
  isDetail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private _columnSvc:ColumnsService,
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

    let path = this.idColumn ? `/inventory/distribution-local/columns/edit/${this.idColumn}` : `/inventory/distribution-local/columns/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this._columnSvc.setListColumn$(this.form.value);
        this.setForm();
      }
    })
  }

  private setForm(){
    this.idColumn = null;
    this.form.reset()
    this.form.patchValue({shelf_id: this.id})
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
}