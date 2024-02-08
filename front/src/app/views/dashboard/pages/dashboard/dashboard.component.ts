import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { CrudServices } from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {}
  
}
