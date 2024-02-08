import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-sales',
  templateUrl: './detail-sales.component.html',
  styleUrls: ['./detail-sales.component.scss']
})
export class DetailSalesComponent implements OnInit {
  @Input() salesClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
