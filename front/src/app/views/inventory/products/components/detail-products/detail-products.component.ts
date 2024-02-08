import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { CrudServices } from '../../../../../shared/services/crud.service';

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
  previewImage: string = '';
  previewVisible: boolean = false;

  constructor(
    private _crudSvc: CrudServices,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  edit() {
      this.isEdit = true;
  }
  
  editClose() {
      this.isEdit = false;
  }
  
  getProduct() {
    this._crudSvc.getRequest(`/products/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
       this.product = data;
    })
  }

}