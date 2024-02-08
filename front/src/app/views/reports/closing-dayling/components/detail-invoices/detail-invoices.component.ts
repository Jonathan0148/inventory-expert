import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-invoices',
  templateUrl: './detail-invoices.component.html',
  styleUrls: ['./detail-invoices.component.scss']
})
export class DetailInvoicesComponent implements OnInit {
  @Input() invoicesClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
