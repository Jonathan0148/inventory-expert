import { Component, Input, OnInit } from '@angular/core';
import { SubcategoryModel } from '../../../../../shared/interfaces/subcategory';
import { CategoryModel } from '../../../../../shared/interfaces/category';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-fields-categories',
  templateUrl: './fields-categories.component.html',
  styleUrls: ['./fields-categories.component.scss']
})
export class FieldsCategoriesComponent implements OnInit {
  @Input() form:UntypedFormGroup;

  loading:boolean = false;
  loadingCategory: boolean;
  categoriesList:CategoryModel[] = [];
  subcategoriesList:SubcategoryModel[] = [];
  pageCategory:number = 1;
  termCategory:string = '';
  lastPageCategory:number;
  
  pageSubcategory:number = 1;
  termSubcategory:string = '';
  lastPageSubcategory:number;

  categoriesListAdd: Array<any> = [];
  categoriesForm: Array<any> = [];

  constructor(
    private _crudSvc: CrudServices
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.categoriesListAdd = this.form.get('categories').value || [];
    this.setCategories()
  }

  public setCategories():void {
    let arr = this.form.get('categories').value;
    if(!arr) return 

    arr.forEach(element => {
      this.categoriesForm.push({
        category_id: element?.category_id, 
        sub_category_id: element?.sub_category_id || null
      })
    });
    this.form.patchValue({ categories: this.categoriesForm })
    
  }


  public getSubcategories():void {
    this.loading = true;
    const query = [
      `?page=${this.pageSubcategory}`,
      `&term=${this.termSubcategory}`,
      `&category=${((this.form.get('category').value?.id)) ?? ''}`,
    ].join('');
    
    if(this.lastPageSubcategory && ((this.lastPageSubcategory < this.pageSubcategory) && !this.termSubcategory) ) return

    this._crudSvc.getRequest(`/subcategories/index${query}`)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
        const { data } = res;
        (!this.termSubcategory) ? this.subcategoriesList = [...this.subcategoriesList,  ...data.data] : this.subcategoriesList = data.data;
        this.lastPageSubcategory = data.last_page;
        this.pageSubcategory++;
    })
  }

  public getCategories():void {
    this.loadingCategory = true;
    const query = [
      `?page=${this.pageCategory}`,
      `&term=${this.termCategory}`
    ].join('');
    
    if( this.lastPageCategory && ((this.lastPageCategory < this.pageCategory) && !this.termCategory) ) return

    this._crudSvc.getRequest(`/categories/index${query}`).pipe(finalize( () => this.loadingCategory = false))
    .subscribe((res: any) => {
        const { data } = res;
        (!this.termCategory) ? this.categoriesList = [...this.categoriesList,  ...data.data] : this.categoriesList = data.data;
        this.lastPageCategory = data.last_page;
        this.pageCategory++;
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchCategory(event:string){

    if(event?.length > 3) {
      this.termCategory = event;
      this.getCategories();
      this.setPageCategories();
    }

    if(!event?.length && this.termCategory) {
      this.setPageCategories();
      this.termCategory = '';
      this.categoriesList = []
      this.getCategories();
    }  
  }

  public onSearchSubcategory(event:string){

    if(event?.length > 3) {
      this.termSubcategory = event;
      this.getSubcategories();
      this.setPageSubcategories();
    }

    if(!event?.length && this.termSubcategory) {
      this.setPageSubcategories();
      this.termSubcategory = '';
      this.subcategoriesList = []
      this.getSubcategories();
    }  
  }

  public onChangeCategory(category:CategoryModel):void{
    this.setPageSubcategories()
    this.subcategoriesList = []
    this.getSubcategories();
  }


  public onClickAddCategoryItem():void {
    const { id:category_id, name:name_category } = this.form.get('category').value, subcategory = this.form.get('subcategory').value,sub_category_id = subcategory?.id, name_subcategory = subcategory?.name;
    
    this.categoriesListAdd.push({category_id, name_category, sub_category_id,name_subcategory})
    this.categoriesForm.push({category_id:category_id, sub_category_id:sub_category_id || null})
    this.form.patchValue({ categories: this.categoriesForm })
    this.setForm()
  }

  public onDeleteCategory(indexCategory:number):void{
    this.categoriesForm.splice(indexCategory, 1);
    this.categoriesListAdd.splice(indexCategory, 1);
    this.form.patchValue({ categories: this.categoriesForm })
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPageCategories = ():number => this.pageCategory = 1; 
  private setPageSubcategories = ():number => this.pageSubcategory = 1; 
  public validatorFieldCategory = ():boolean => !this.form.get('category').value; 
  public validatorFieldSubcategory = ():boolean => !this.form.get('subcategory').value; 
  public setForm = ():void => {this.form.patchValue({category:null, subcategory:null}); this.subcategoriesList = []} 
  
}
