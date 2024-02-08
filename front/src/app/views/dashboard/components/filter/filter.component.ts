import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateServicesService } from '../../../../shared/services/date-services.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  date:Date;
  type:string;
  @Output() getDate = new EventEmitter<any>();

  constructor(
    private _dateSvc:DateServicesService
  ) { }

  ngOnInit(): void {}

  public changeDate(event:any): void { 
    const { date, type } = event;
    this.date = date; this.type = type;
    if(!date) return this.getDate.emit({date: null, type: null});
    return this.getDate.emit({date: this._dateSvc.getDate(date, type), type});
  }
}
