import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-type-activity',
  templateUrl: './info-type-activity.component.html',
  styleUrls: ['./info-type-activity.component.scss']
})
export class InfoTypeActivityComponent implements OnInit {
  @Input() item:any;
  @Input() type:any;
 
  constructor() { }

  ngOnInit(): void {
  }

}
