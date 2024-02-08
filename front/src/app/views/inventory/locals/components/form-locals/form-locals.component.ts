import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';

@Component({
  selector: 'app-form-locals',
  templateUrl: './form-locals.component.html',
  styleUrls: ['./form-locals.component.scss']
})
export class FormLocalsComponent implements OnInit, OnChanges {

  @Input() id:number;
  @Input() section:any;
  @Output() isEditEmit = new EventEmitter<boolean>();
  
  form: FormGroup;
  loading:boolean;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.section.currentValue) this.setSectionForm()
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        name: [ null, [ Validators.required ] ],
        code: [ null, [ Validators.required] ],
    });

    if(!this.id) this.getCount();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/local/sections/update/${this.id}` : `/local/sections/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success, data } = res;
      if (success) {
        if(this.id) this.isEditEmit.emit(this.form.value) 
        this.router.navigate(['/', 'inventario','local','editar', this.id || data.id]);
      }
    })
  }

  private setSectionForm():void{ this.form.patchValue(this.section); }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  private getCount():void {
    this._crudSvc.getRequest(`/local/sections/getCount`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue({ code: (data?.id ?? 0) + 1 })
    })
  }
}
