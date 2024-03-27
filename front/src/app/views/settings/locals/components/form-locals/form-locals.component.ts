import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-form-locals',
  templateUrl: './form-locals.component.html',
  styleUrls: ['./form-locals.component.scss']
})
export class FormLocalsComponent implements OnInit {
  statusList = this._statusSvC.get();
  form: FormGroup;
  id:number;
  loading:boolean;
  isDetail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private _statusSvC:StatesService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getLocal();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_name: [ null, [ Validators.required ] ],
        nit: [ null, [ Validators.required] ],
        slogan: [ null, [ Validators.required] ],
        cell_phone: [ null, [ Validators.required ] ],
        landline: [ null, [] ],
        email: [ null, [ Validators.required, Validators.email ] ],
        country: [ null, [ Validators.required ] ],
        department: [ null, [ Validators.required ] ],
        city: [ null, [ Validators.required ] ],
        address: [ null, [ Validators.required ] ],
        state: [ null, [ Validators.required ] ]
    });
    if(this.id) this.getLocal()
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/settings/stores/edit/${this.id}` : `/settings/stores/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'locales']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getLocal(){
    this._crudSvc.getRequest(`/settings/stores/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }
}