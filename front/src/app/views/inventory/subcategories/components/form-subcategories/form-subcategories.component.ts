import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoryModel } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'app-form-subcategories',
  templateUrl: './form-subcategories.component.html',
  styleUrls: ['./form-subcategories.component.scss']
})
export class FormSubcategoriesComponent implements OnInit {

  @Input() id:number;

  form: FormGroup;
  loading:boolean;
  categoriesList:CategoryModel[] = [];
  pageCategory: number = 1;
  termCategory: string = '';
  lastPageCategory: number;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        name: [ null, [ Validators.required ] ],
        code: [ null, [ Validators.required] ],
        id_category: [ null, [ Validators.required ] ],
    });
    
    if(this.id) this.getSubcategory();
    this.getCategories();
    if(!this.id) this.getCount();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/subcategories/update/${this.id}` : `/subcategories/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'inventario','subcategorias']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getSubcategory():void {
    this._crudSvc.getRequest(`/subcategories/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }

  public getCategories():void {
    const query = [
      `?page=${this.pageCategory}`,
      `&term=${this.termCategory}`
    ].join('');
    
    if( this.lastPageCategory && ((this.lastPageCategory < this.pageCategory) && !this.termCategory) ) return

    this._crudSvc.getRequest(`/categories/index${query}`).subscribe((res: any) => {
        const { data } = res;
        
        (!this.termCategory) ? this.categoriesList = [...this.categoriesList,  ...data.data] : this.categoriesList = data.data;
        this.lastPageCategory = data.last_page;
        this.pageCategory++;
    })
  }

  private getCount():void {
    this._crudSvc.getRequest(`/subcategories/getCount`).subscribe((res: any) => {
      const { data } = res;
     this.form.patchValue({ code: (data?.id ?? 0) + 1 })
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchCategory(event:string){

    if(event.length > 3) {
      this.termCategory = event;
      this.getCategories();
      this.setPage();
    }

    if(!event.length && this.termCategory) {
      this.setPage();
      this.termCategory = '';
      this.categoriesList = []
      this.getCategories();
    }  
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageCategory = 1; 
}
