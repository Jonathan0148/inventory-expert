import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-card-report',
  templateUrl: './detail-card-report.component.html',
  styleUrls: ['./detail-card-report.component.scss']
})
export class DetailCardReportComponent implements OnInit {
  
  @Input() title:string;
  @Input() description:string;
  @Input() icon:string;
  @Input() value:string;
  @Input() listPrices:string[] | any;
  @Input() hasDetail:boolean;
  @Input() prefix:string;
  @Input() type:string;

  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
