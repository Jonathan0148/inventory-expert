import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { CategoryModel } from '../../../../../shared/interfaces/category';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { SubcategoryModel } from '../../../../../shared/interfaces/subcategory';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filters = new EventEmitter<any>(); 
  @Input() selectedCategory:CategoryModel;
  @Input() selectedStatus:StatusModel;
  @Input() selectedSubcategory:SubcategoryModel;
  @Input() selectedBrand:BrandModel;

  statusList:StatusModel[] = this._statusSvc.get();
  pageCategory: number = 1;
  categoriesList: CategoryModel[] = [];
  subcategoriesList: CategoryModel[] = [];
  brandsList: BrandModel[] = [];
  termCategory: string = '';
  lastPageCategory: number;
  termSubcategory: string = '';
  lastPageSubcategory: number;
  pageSubcategory: number = 1;
  termBrand: string = '';
  lastPageBrand: number;
  pageBrand: number = 1;

  constructor(
    private _statusSvc: StatusService,
    private _crudSvc:CrudServices,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands()
  }


  public getCategories():void {
    const query = [
      `?page=${this.pageCategory}`,
      `&term=${this.termCategory}`
    ].join('');
    
    if(this.lastPageCategory && ((this.lastPageCategory < this.pageCategory) && !this.termCategory) ) return

    this._crudSvc.getRequest(`/categories/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termCategory) ? this.categoriesList = [...this.categoriesList,  ...data.data] : this.categoriesList = data.data;
        this.lastPageCategory = data.last_page;
        this.pageCategory++;
    })
  }

  public getSubcategories():void {
    const query = [
      `?page=${this.pageSubcategory}`,
      `&term=${this.termSubcategory}`,
      `&category=${((this.selectedCategory)) ?? ''}`,
    ].join('');
    
    if(this.lastPageSubcategory && ((this.lastPageSubcategory < this.pageSubcategory) && !this.termSubcategory)) return

    this._crudSvc.getRequest(`/subcategories/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termSubcategory) ? this.subcategoriesList = [...this.subcategoriesList,  ...data.data] : this.subcategoriesList = data.data;
        this.lastPageSubcategory = data.last_page;
        this.pageSubcategory++;
    })
  }

  public getBrands():void {
    const query = [
      `?page=${this.pageBrand}`,
      `&term=${this.termBrand}`
    ].join('');
    
    if(this.lastPageBrand && ((this.lastPageBrand < this.pageBrand) && !this.termBrand) ) return

    this._crudSvc.getRequest(`/brands/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termBrand) ? this.brandsList = [...this.brandsList,  ...data.data] : this.brandsList = data.data;
        this.lastPageBrand = data.last_page;
        this.pageBrand++;
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchCategory(event:string){

    if(event?.length > 3) {
      this.termCategory = event;
      this.getCategories();
      this.setPage();
    }

    if(!event?.length && this.termCategory) {
      this.setPage();
      this.termCategory = '';
      this.categoriesList = []
      this.getCategories();
    }  
  }

  public onSearchSubcategory(event:string){

    if(event?.length > 3) {
      this.termSubcategory = event;
      this.getSubcategories();
      this.setPageSub();
    }

    if(!event?.length && this.termSubcategory) {
      this.setPage();
      this.termSubcategory = '';
      this.subcategoriesList = []
      this.getSubcategories();
    }  
  }

  public onSearchBrand(event:string){

    if(event?.length > 3) {
      this.termBrand = event;
      this.getBrands();
      this.setPageBrands();
    }

    if(!event?.length && this.termBrand) {
      this.setPageBrands();
      this.termBrand = '';
      this.brandsList = []
      this.getBrands();
    }  
  }

  public onChangeBrand(brand:BrandModel):void{
    this.selectedBrand = brand;
    this.filters.emit({type: 'brand', data: this.selectedBrand});
  }

  public onChangeCategory(category:CategoryModel):void{
    this.selectedCategory = category;
    this.filters.emit({type: 'category', data: this.selectedCategory});
    this.subcategoriesList = [];
    this.lastPageSubcategory = null
    this.selectedSubcategory = null;
    this.pageSubcategory = 1;
    this.getSubcategories()
  }

  public onChangeSubcategory(subcategory:SubcategoryModel):void{
    this.selectedSubcategory = subcategory;
    this.filters.emit({type: 'subcategory', data: this.selectedSubcategory});
  }

  public statusChange(status:StatusModel):void{
    this.selectedStatus = status;
    this.filters.emit({type: 'status', data: this.selectedStatus});
  }

    
  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageCategory = 1; 
  private setPageSub = ():number => this.pageSubcategory = 1; 
  private setPageBrands = ():number => this.pageBrand = 1; 
}
