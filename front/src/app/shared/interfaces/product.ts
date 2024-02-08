export interface ProductModel {
    id:number;
    name?:string;
    code?:number;
    reference?:string;
    stock?:number;
    original?:boolean | string;
    tax?:number;
    price?:number;
    category?:number;
    brand?:number;
    status?:string;
    applications?:string;
    id_column?:number;
    id_row?:number;
    id_section?:number;
    stockMin?:number;
    cost?:number;
    discount?:number;
    amount?:number;
    description?:string;
}
