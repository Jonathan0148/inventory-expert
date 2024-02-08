import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CategoryModel } from '../../../../shared/interfaces/category';
import { SubcategoryModel } from '../../../../shared/interfaces/subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categoriesLists$ = new Subject<CategoryModel[] | SubcategoryModel[]>();
  
  constructor() {}

  public getCategory$(): Observable<CategoryModel[] | SubcategoryModel[]> {
    return this.categoriesLists$.asObservable();
  }

  public setCategory$(category:CategoryModel[] | SubcategoryModel[]): void{
    return this.categoriesLists$.next(category);
  }

}
