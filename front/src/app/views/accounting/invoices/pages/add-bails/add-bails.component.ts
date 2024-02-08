import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bails',
  templateUrl: './add-bails.component.html',
  styleUrls: ['./add-bails.component.scss']
})
export class AddBailsComponent implements OnInit {
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
  }

}
