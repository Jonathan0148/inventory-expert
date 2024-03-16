import { Injectable } from '@angular/core';
import { TypeDocumentModel } from 'src/app/shared/interfaces/type-document';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentsService {
  typeDocumentsList:TypeDocumentModel[] = [
    { label: 'Cédula de ciudadanía', value: 0 },
    { label: 'Cédula de extranjería', value: 1 },
    { label: 'Tarjeta de identidad', value: 2 },
    { label: 'Pasaporte', value: 3 }
  ];

  public get():TypeDocumentModel[] {
    return this.typeDocumentsList;
  }
}