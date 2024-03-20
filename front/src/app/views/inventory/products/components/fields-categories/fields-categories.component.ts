import { Component, Input, OnInit } from '@angular/core';
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
  pageCategory:number = 1;
  termCategory:string = '';
  lastPageCategory:number;

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
        category_id: element?.category_id
      })
    });
    this.form.patchValue({ categories: this.categoriesForm })
    
  }

  public getCategories():void {
    this.loadingCategory = true;
    const query = [
      `?page=${this.pageCategory}`,
      `&term=${this.termCategory}`
    ].join('');
    
    if( this.lastPageCategory && ((this.lastPageCategory < this.pageCategory) && !this.termCategory) ) return

    this._crudSvc.getRequest(`/inventory/categories/index${query}`).pipe(finalize( () => this.loadingCategory = false))
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

  public onClickAddCategoryItem():void {
    const { id:category_id, name:name_category } = this.form.get('category').value;
    
    this.categoriesListAdd.push({category_id, name_category})
    this.categoriesForm.push({category_id:category_id})
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
  public validatorFieldCategory = ():boolean => !this.form.get('category').value; 
  public setForm = ():void => {this.form.patchValue({category:null})} 
  
}
