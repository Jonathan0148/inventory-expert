import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CategoryModel } from '../../../../shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categoriesLists$ = new Subject<CategoryModel[]>();
  
  constructor() {}

  public getCategory$(): Observable<CategoryModel[]> {
    return this.categoriesLists$.asObservable();
  }

  public setCategory$(category:CategoryModel[]): void{
    return this.categoriesLists$.next(category);
  }

}
