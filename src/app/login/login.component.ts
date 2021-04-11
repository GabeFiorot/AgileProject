import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import {Game} from '../board/Game'
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, Form} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  API_URL:string = "https://agile-chess-api.azurewebsites.net/api/Games/";
  loginForm: FormGroup;
  constructor(private router:Router, private httpClient: HttpClient, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      id: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login() // THIS IS A TEMP FUNCTION IT IS NOT AN ACTUAL LOGIN
  {
    this.router.navigate(['/'], {state: {data: {userId : this.loginForm.value.id}}});

  }

}
