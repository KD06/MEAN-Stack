import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.loading = true;
    this.authService.login(form.value.email, form.value.password);
  }

}
