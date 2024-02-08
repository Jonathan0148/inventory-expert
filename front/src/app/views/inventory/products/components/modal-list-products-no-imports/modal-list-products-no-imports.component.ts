import { Component, OnInit } from '@angular/core';
import { ProductsImportService } from '../../services/products-import.service';
import { ProductModel } from '../../../../../shared/interfaces/product';

@Component({
  selector: 'app-modal-list-products-no-imports',
  templateUrl: './modal-list-products-no-imports.component.html',
  styleUrls: ['./modal-list-products-no-imports.component.scss']
})
export class ModalListProductsNoImportsComponent implements OnInit {
  isSpinning:boolean = false;
  products:any = [];
  rowImported:number = 0; 

  constructor(
    private _productSvc:ProductsImportService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts():void {
    this._productSvc.productsLists$.subscribe(res => {
      this.products = res;
    });

    this._productSvc.rowImported$.subscribe(res => {
      this.rowImported = res;
    });
  }

}
