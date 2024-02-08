import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize, filter } from 'rxjs/operators';
import { ModuleModel } from '../../../../../shared/interfaces/module';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.scss']
})
export class FormRolesComponent implements OnInit {
  form: FormGroup;
  id:number;
  loading:boolean;
  modules_attach:any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });

    if(this.id) this.getRole()
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        name: [ null, [ Validators.required ] ],
        description: [ null, [ Validators.required] ],
        modules: this.fb.array([]),
    });

    if(!this.id) this.getModules();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/roles/update/${this.id}` : `/roles/create`;
    
    this.modules_attach = this.getModulesAttach();

    let body = {
      ...this.form.value,
      modules: this.modules_attach
    }
  
    this._crudSvc.postRequest(path, body)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'roles']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  
  public getRole(){
    this._crudSvc.getRequest(`/roles/show/${this.id}`).subscribe((res: any) => {
      const { data:{role, modules} } = res;
      this.form.patchValue(role);
      this.setModulesForm(modules);
  })
  }
  
  private getModules():void {
    this._crudSvc.getRequest(`/roles/getModules`).subscribe((res: any) => {
        const { data } = res;
        this.setModulesForm(data);
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------FORM ARRAYS------------------------------
  //------------------------------------------------------------------------
  get modules():UntypedFormArray{
    return this.form.controls["modules"] as UntypedFormArray;
  }

  private setModulesForm(modulesArray: ModuleModel[]):void {
    this.modules.clear();
    modulesArray.forEach((_module,index) => {            
      const lessonForm = this.fb.group({
        module_id: [_module.id, []],
        name: [_module.name, []],
        selected: [!!_module.selected, []],
        has_admin: [(_module?.has_admin)?.toString(), []],
      });      
      this.modules.push(lessonForm);   
    }); 
  }


  public onClickModuleActive(indexModule:number):void {
    this.modules.at(indexModule).patchValue({ selected: !this.modules.at(indexModule).get('selected').value })
  }

  private getModulesAttach(){
    return this.modules.value.map( e => { 
      return {module_id:e.module_id,selected:e.selected,has_admin:e.has_admin}
    });
  }


}
