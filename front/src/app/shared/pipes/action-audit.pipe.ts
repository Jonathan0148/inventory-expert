import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionAudit'
})
export class ActionAuditPipe implements PipeTransform {

  types = [
    { value: 1, action:"Crear", text:"Agrego" },
    { value: 2, action:"Actualizar", text:"Actualizó" },
    { value: 3, action:"Borrar", text:"Eliminó" },
    { value: 4, action:"Abono", text:"Realizo un abono " },
  ]

  transform(value: number): unknown {
    return this.types.filter(e => e.value == value)[0];
  }

}
