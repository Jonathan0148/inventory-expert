import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-expenses',
  templateUrl: './detail-expenses.component.html',
  styleUrls: ['./detail-expenses.component.scss']
})
export class DetailExpensesComponent implements OnInit {
  @Input() expensesClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
