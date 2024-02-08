import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorProduct'
})
export class ColorProductPipe implements PipeTransform {

  statusList = {
    "low-stock": "gold",
    'in-stock': 'green',
    'out-stock': 'red'
  }

  transform(value: string): string {
    return this.statusList[value] ?? 'Sin Stock';
  }

}
