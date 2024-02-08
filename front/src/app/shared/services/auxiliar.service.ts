import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

  colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae','#2ECC71','#884EA0','#3498DB','#E74C3C','#34495E','#de4436','#fa541c','#fa8c16','#ffc107','#a0d911','#05c9a7','#3f87f5','#2f54eb','#886cff'];

  public getRandomNumber():number{
    return Math.floor((Math.random() * ((this.colorList.length - 1) - 0 + 1)) + 0);
  }

  public getNameShort(name:string):string {
    let nameList = name.split(' ');
    return `${nameList[0]?.split('')[0]}${(nameList[1]?.split('')[0]) ?? ''}`;
  }
}
