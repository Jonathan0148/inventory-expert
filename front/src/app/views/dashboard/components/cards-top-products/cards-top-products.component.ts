import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudServices } from '../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cards-top-products',
  templateUrl: './cards-top-products.component.html',
  styleUrls: ['./cards-top-products.component.scss']
})
export class CardsTopProductsComponent implements OnInit, OnDestroy {
 
  productsList = []    
  loading:boolean; 

  constructor(
    private _crudSvc:CrudServices,
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit():void {
    this.getTopProducts()
  }

  private getTopProducts():void {
    this.loading = true;
    
    this._crudSvc.getRequest(`/dashboard/getTopProducts`)
    .pipe(finalize( () => this.loading = false ))
    .subscribe((res: any) => {
        const { data } = res;
        this.productsList = data.data;
    })
  }
}
