import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {
  @Input() date:Date;
  @Input() hasYear:boolean;
  @Output() changeDate = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeDate(type:string){
    return this.changeDate.emit({ date:this.date, type })
  }

}
