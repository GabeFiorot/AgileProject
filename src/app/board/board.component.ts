import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, Form} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var ChessBoard: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  chat: string = 'Message: hey there \n Message: How\'s it going?\n';
  board: any;
  deviceForm: FormGroup;
  constructor(private httpClient: HttpClient, private fb:FormBuilder, private router:Router) {

      this.deviceForm = this.fb.group({
        message: ['', Validators.required]
      });
   }

  ngOnInit(): void {
    
    this.board = ChessBoard('board1', {
      position: 'start',
      draggable: true
    });


    
  }

}
