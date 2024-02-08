import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-type-simple-report',
  templateUrl: './detail-type-simple-report.component.html',
  styleUrls: ['./detail-type-simple-report.component.scss']
})
export class DetailTypeSimpleReportComponent implements OnInit {
  @Input() listPrices:string[] | any;
  @Input() type:string;
  @Input() prefix:string;

  constructor() { }

  ngOnInit(): void {
  }

}
