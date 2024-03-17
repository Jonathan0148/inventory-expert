import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-locals',
  templateUrl: './add-locals.component.html',
  styleUrls: ['./add-locals.component.scss']
})
export class AddLocalsComponent implements OnInit {
  id:number;
  isDetail: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      this.isDetail = !!this.router.url
      .split("/")
      .find((a) => a === 'detalle');
    });
  }

  ngOnInit(): void {
  }
}