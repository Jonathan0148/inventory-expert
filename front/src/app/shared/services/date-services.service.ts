import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServicesService {

  constructor() { }

  public getDate(date:Date, type:string): string | number | Date { 
    let dateFull = date;
    if(type === 'day'){
      return `${dateFull.getFullYear()}-${(dateFull.getMonth() + 1)}-${dateFull.getDate()}`;
    }
    if(type === 'month'){
      return `${dateFull.getFullYear()}-${(dateFull.getMonth() + 1)}-01`;
    }
    return dateFull;
  }
}
