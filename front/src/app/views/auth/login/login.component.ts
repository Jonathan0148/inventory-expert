import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading:boolean; 

  constructor(
      private fb: FormBuilder,    
      private authSvc: AuthService,
      private router: Router,
  ) { }

  ngOnInit(): void {
      this.form = this.fb.group({
          email: ["", [ Validators.required, Validators.email ] ],
          password: ["", [ Validators.required ] ]
      });    
      this.checkSession();
  }

  
  submitForm(): void {
      this.loading = true;    
      this.authSvc.login(this.form.value)
      .pipe((finalize(() => this.loading = false)))
      .subscribe(res => {
        const { success } = res;
        if(success){
          this.authSvc.setterSettings(res);
          this.router.navigate(['']);
        }
      })
  }

  checkSession() {
    this.authSvc.checkSession(true).then(() => {
      this.router.navigate(['']);
    }).catch(() => console.log)
  }
}
