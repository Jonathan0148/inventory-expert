import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-observations-order',
  templateUrl: './observations-order.component.html',
  styleUrls: ['./observations-order.component.scss']
})
export class ObservationsOrderComponent implements OnInit {

  @Input() form:UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {}

}