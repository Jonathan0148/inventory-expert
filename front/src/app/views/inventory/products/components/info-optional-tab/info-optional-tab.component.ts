import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { LocalModel } from '../../../../../shared/interfaces/local';

@Component({
  selector: 'app-info-optional-tab',
  templateUrl: './info-optional-tab.component.html',
  styleUrls: ['./info-optional-tab.component.scss']
})
export class InfoOptionalTabComponent implements OnInit {
  
  @Input() form:FormGroup;
  rowList:LocalModel[] = [];
  columnList:LocalModel[] = [];
  sectionList:LocalModel[] = [];
  loading: boolean;
  pageSection: number = 1;
  lastPageSection:number;
  termSection: string = '';
  limit: number = 10;
  pageRow: number = 1;
  lastPageRow:number;
  termRow: string = '';
  pageColumn: number = 1;
  lastPageColumn:number;
  termColumn: string = '';

  constructor(
    private _crudSvc: CrudServices,
  ) { }

  ngOnInit(): void {
    this.getSections();
    if(this.form.get('id_section').value) this.onChangeSection([])
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getSections():void {
    this.loading = true;
  
    const query = [
      `?page=${this.pageSection}`,
      `&term=${this.termSection}`,
      `&limit=${this.limit}`
    ].join('');

    if( this.lastPageSection && ((this.lastPageSection < this.pageSection) && !this.termSection) ) return

    this._crudSvc.getRequest(`/local/sections/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
      const { data } = res;   
      (!this.termSection) ? this.sectionList = [...this.sectionList,  ...data.data] : this.sectionList = data.data;
      this.lastPageSection = data.last_page;
      this.pageSection++;
    })
  }


  public getRows():void {
    this.loading = true;

    if(!this.validateSectionField()) return
    
    const query = [
      `?page=${this.pageRow}`,
      `&term=${this.termRow}`,
      `&limit=${this.limit}`
    ].join('');

    if( this.lastPageRow && ((this.lastPageRow < this.pageRow) && !this.termRow) ) return

    this._crudSvc.postRequest(`/local/sections/getRowsSelect${query}`,{ id_section: this.form.get('id_section').value })
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { data } = res;   
      (!this.termRow) ? this.rowList = [...this.rowList,  ...data.data] : this.rowList = data.data;
      this.lastPageRow = data.last_page;
      this.pageRow++;
    })
  }

  public getColumns():void {
    this.loading = true;

    if(!this.validateSectionField()) return
    
    const query = [
      `?page=${this.pageColumn}`,
      `&term=${this.termColumn}`,
      `&limit=${this.limit}`
    ].join('');

    if( this.lastPageColumn && ((this.lastPageColumn < this.pageColumn) && !this.termColumn) ) return

    this._crudSvc.postRequest(`/local/sections/getColumnsSelect${query}`, { id_section: this.form.get('id_section').value })
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { data } = res;   
      (!this.termColumn) ? this.columnList = [...this.columnList,  ...data.data] : this.columnList = data.data;
      this.lastPageColumn = data.last_page;
      this.pageColumn++;
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchSection(event:string){

    if(event.length > 3) {
      this.termSection = event;
      this.getSections();
      this.setPage();
    }

    if(!event.length && this.termSection) {
      this.setPage();
      this.termSection = '';
      this.sectionList = []
      this.getSections();
    }  
  }

  public onSearchRow(event:string){
    
    if(!this.validateSectionField()) return

    if(event.length > 3) {
      this.termRow = event;
      this.getRows();
      this.setPageRow();
    }

    if(!event.length && this.termSection) {
      this.setPageRow();
      this.termRow = '';
      this.rowList = []
      this.getRows();
    }  
  }

  public onSearchColumn(event:string){

    if(!this.validateSectionField()) return

    if(event.length > 3) {
      this.termColumn = event;
      this.getColumns();
      this.setPageColumn();
    }

    if(!event.length && this.termColumn) {
      this.setPageColumn();
      this.termColumn = '';
      this.columnList = []
      this.getColumns();
    }  
  }

  public onChangeSection(event:any):void{
    this.resetVariables()
    this.getColumns()
    this.getRows()
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageSection = 1; 
  private setPageRow = ():number => this.pageRow = 1; 
  private setPageColumn= ():number => this.pageColumn = 1; 
  private validateSectionField = ():boolean => !!this.form.get('id_section').value; 
  private resetVariables = ():void => { this.columnList = []; this.rowList = []; }; 
}
