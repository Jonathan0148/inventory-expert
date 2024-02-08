import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProduct'
})

export class StatusProductPipe implements PipeTransform {
  
  statusList = {
    "low-stock": "Bajo stock",
    'in-stock': 'Disponible',
    'out-stock': 'Sin Stock'
  }

  transform(value: string): string {
    return this.statusList[value] ?? 'Sin Stock';
  }

}
