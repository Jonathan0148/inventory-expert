export interface UserModel {
    id?:number;
    name?: string;
    email: string;
    password?:string;
    avatar?:string;
    role:string;
    status:string;
}