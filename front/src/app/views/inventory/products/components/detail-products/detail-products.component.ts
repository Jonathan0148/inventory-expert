import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent implements OnInit {
  id:number;
  isEdit: boolean = false;
  isDetailForm: boolean = true;
  product: ProductModel;
  avatarUrl: string = "";
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 

  constructor(
    private _crudSvc: CrudServices,
    private activatedRoute: ActivatedRoute,
    private cookieSvc: CookieService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.setHasAdmin();
  }

  edit() {
      this.isEdit = true;
  }
  
  editClose() {
      this.isEdit = false;
  }
  
  getProduct() {
    this._crudSvc.getRequest(`/inventory/products/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
       this.product = data;
       this.avatarUrl = this.product?.images[0]?.response?.url;
    })
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 16);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
}