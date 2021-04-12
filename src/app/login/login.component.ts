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
  LOGIN_URL:string = 'https://agile-chess-api.azurewebsites.net/api/profile/';
  loginForm: FormGroup;
  constructor(private router:Router, private httpClient: HttpClient, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login() // THIS IS A TEMP FUNCTION IT IS NOT AN ACTUAL LOGIN
  {

    var password = this.loginForm.value.password;
    //this.router.navigate(['/'], {state: {data: {userId : this.loginForm.value.id}}});
    var json;
    this.sha256(password).then(hash => {
      //console.log(url + hash)
      this.httpClient
        .get<any>(this.LOGIN_URL + '?username=' + this.loginForm.value.username + '&pass=' + hash)
        .subscribe(res => {
          json = res;
          console.log("json: " + json);
          this.router.navigate(['/devices'], {state: {data: {userId : json, username : this.loginForm.value.username}}});
      
    } , err => {
      console.log(err.error.text);    
    });
    });



  }

  async sha256(message:string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

}
