import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseServiceAutoService } from 'src/app/services/firebase-service-auto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(
    private authServ: FirebaseServiceAutoService
  ) { }

  ngOnInit(): void {
  }

  
  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authServ.login(email, password);
  }

}
