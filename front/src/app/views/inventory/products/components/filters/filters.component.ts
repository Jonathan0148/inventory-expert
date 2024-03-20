import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { CategoryModel } from '../../../../../shared/interfaces/category';
import { BrandModel } from '../../../../../shared/interfaces/brand';
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
  @Input() selectedBrand:BrandModel;

  statusList:StatusModel[] = this._statusSvc.get();
  pageCategory: number = 1;
  categoriesList: CategoryModel[] = [];
  brandsList: BrandModel[] = [];
  termCategory: string = '';
  lastPageCategory: number;
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

    this._crudSvc.getRequest(`/inventory/categories/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termCategory) ? this.categoriesList = [...this.categoriesList,  ...data.data] : this.categoriesList = data.data;
        this.lastPageCategory = data.last_page;
        this.pageCategory++;
    })
  }

  public getBrands():void {
    const query = [
      `?page=${this.pageBrand}`,
      `&term=${this.termBrand}`
    ].join('');
    
    if(this.lastPageBrand && ((this.lastPageBrand < this.pageBrand) && !this.termBrand) ) return

    this._crudSvc.getRequest(`/inventory/brands/index${query}`).subscribe((res: any) => {
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
  }

  public statusChange(status:StatusModel):void{
    this.selectedStatus = status;
    this.filters.emit({type: 'status', data: this.selectedStatus});
  }

    
  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageCategory = 1; 
  private setPageBrands = ():number => this.pageBrand = 1; 
}
