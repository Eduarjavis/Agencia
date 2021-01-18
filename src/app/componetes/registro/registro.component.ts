import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseServiceAutoService } from '../../services/firebase-service-auto.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  
  constructor(private authServ:FirebaseServiceAutoService) { }

  ngOnInit(): void {
  }

  onRegister(){
    const {email,password}=this.loginForm.value;
    this.authServ.register(email,password);
  }

}
