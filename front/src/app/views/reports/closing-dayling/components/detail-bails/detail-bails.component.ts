import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-bails',
  templateUrl: './detail-bails.component.html',
  styleUrls: ['./detail-bails.component.scss']
})
export class DetailBailsComponent implements OnInit {
  @Input() bailsClosing:any;

  constructor() { }

  ngOnInit(): void {
  }

}
