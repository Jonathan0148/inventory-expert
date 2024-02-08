import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { LocalModel } from '../../../../../shared/interfaces/local';

@Component({
  selector: 'app-add-locals',
  templateUrl: './add-locals.component.html',
  styleUrls: ['./add-locals.component.scss']
})
export class AddLocalsComponent implements OnInit {
  id: number;
  section: LocalModel[];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private _crudSvc:CrudServices
    ) {  
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    })
    if(this.id) this.getSection()
  }

  ngOnInit(): void {}

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getSection(){
    this._crudSvc.getRequest(`/local/sections/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.section = data;
    })
  }

  public editForm(section:LocalModel[]):void{
    this.section = section;
  }
}
