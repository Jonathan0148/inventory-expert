import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-balance',
  templateUrl: './detail-balance.component.html',
  styleUrls: ['./detail-balance.component.scss']
})
export class DetailBalanceComponent implements OnInit {
  @Input() balanceClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
