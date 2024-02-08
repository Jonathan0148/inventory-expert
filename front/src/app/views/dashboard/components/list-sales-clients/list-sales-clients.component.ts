import { Component, Input, OnInit } from '@angular/core';
import { SalesModel } from '../../../../shared/interfaces/sales';

@Component({
  selector: 'app-list-sales-clients',
  templateUrl: './list-sales-clients.component.html',
  styleUrls: ['./list-sales-clients.component.scss']
})
export class ListSalesClientsComponent implements OnInit {

  @Input() sales:SalesModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
