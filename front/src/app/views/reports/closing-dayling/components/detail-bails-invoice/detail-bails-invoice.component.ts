import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-bails-invoice',
  templateUrl: './detail-bails-invoice.component.html',
  styleUrls: ['./detail-bails-invoice.component.scss']
})
export class DetailBailsInvoiceComponent implements OnInit {
  @Input() bailsInvoicesClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
