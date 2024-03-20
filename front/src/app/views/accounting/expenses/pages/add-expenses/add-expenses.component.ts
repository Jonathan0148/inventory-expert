import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  id: number;
  isDetail: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      this.isDetail = !!this.router.url
        .split("/")
        .find((a) => a === 'detalle');
    });
  }

  ngOnInit(): void {}
}