import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { BrandModel } from '../../../../../shared/interfaces/brand';

@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.scss']
})
export class FormBrandComponent implements OnInit {

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
        name: [ null, [ Validators.required ] ],
        code: [ null, [ Validators.required] ],
    });

    if(!this.id) this.getCount();
    if(this.id) this.getBrand()
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/brands/update/${this.id}` : `/brands/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'inventario','marcas']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getBrand(){
    this._crudSvc.getRequest(`/brands/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }

  private getCount():void {
    this._crudSvc.getRequest(`/brands/getCount`).subscribe((res: any) => {
      const { data } = res;
     this.form.patchValue({ code: (data?.id ?? 0) + 1 })
    })
  }
}
