import { Component, Input, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BailModel } from '../../../../../shared/interfaces/bail';

@Component({
  selector: 'app-list-bails',
  templateUrl: './list-bails.component.html',
  styleUrls: ['./list-bails.component.scss']
})
export class ListBailsComponent implements OnInit {

  @Input() bailsList:BailModel[]; 
  @Input() orderColumn:any;
  @Input() loading:boolean;  

  constructor() { }

  ngOnInit(): void {
  }

}
