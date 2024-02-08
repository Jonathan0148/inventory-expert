import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-observations-sales',
  templateUrl: './observations-sales.component.html',
  styleUrls: ['./observations-sales.component.scss']
})
export class ObservationsSalesComponent implements OnInit {
  
  @Input() form:UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
