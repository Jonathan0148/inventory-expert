import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gobal-table',
  templateUrl: './gobal-table.component.html',
  styleUrls: ['./gobal-table.component.scss']
})
export class GobalTableComponent implements OnInit {
  @Input() listHeaders:any;

  constructor() { }

  ngOnInit(): void {
  }

}
