import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ProductModel } from '../../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsImportService {

  public productsLists$ = new BehaviorSubject<ProductModel>(null);
  public rowImported$ = new BehaviorSubject<number>(0);
  
  constructor() {}

  public getProduct$(): Observable<ProductModel> {
    return this.productsLists$.asObservable();
  }

  public setProduct$(product:ProductModel): void{
    return this.productsLists$.next(product);
  }

  public setRowImported$(row:number): void{
    return this.rowImported$.next(row);
  }

}
