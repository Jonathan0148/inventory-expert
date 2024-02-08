import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ProductModel } from '../../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailService {

  public productLists$ = new Subject<ProductModel>();
  public changeProduct$ = new Subject<boolean>();
  
  constructor() {}

  public getProduct$(): Observable<ProductModel> {
    return this.productLists$.asObservable();
  }

  public setListProduct$(product:ProductModel): void{
    return this.productLists$.next(product);
  }

  public setChangePrice$(hasChange:boolean): void{
    return this.changeProduct$.next(hasChange);
  }
}
