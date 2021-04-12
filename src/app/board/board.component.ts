import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, Form} from '@angular/forms';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import {Game} from './Game';
declare var ChessBoard: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  //chat: string = 'Message: hey there \n Message: How\'s it going?\n';
  board: any;
  gameId!:number;
  API_URL:string = 'https://agile-chess-api.azurewebsites.net/api/Games/';
  currentGame!: Game;
  deviceForm: FormGroup;
  constructor(private httpClient: HttpClient, private fb:FormBuilder, private router:Router) {

      this.deviceForm = this.fb.group({
        message: ['', Validators.required]
      });
      
   }

   isOpponentPresent()
   {
     return ((this.currentGame.playerB == -1) || (this.currentGame.playerW == -1))
   }

  ngOnInit(): void {
    
    this.board = ChessBoard('board1', {
      position: 'start',
      draggable: true
    });
    this.gameId = history.state.data.gameId;
    console.log("game " + this.gameId + " entered");
    this.updateGame(this.gameId);
  }

  pushGameState()
  {
    //make the database update
  }

  updateGame(gameId:number)
  {
    this.httpClient
        // note that you gotta put the schedule id in the url string
        .get<any>(this.API_URL + this.gameId)
        .subscribe(res => {
          console.log(res);
          this.currentGame = res;
          this.gameId = this.currentGame.gameId;
        }, err => console.log(err));
  }

  sendMessage()
  {
    console.log("sent: " + this.deviceForm.value.message);
    this.currentGame.chat += (this.deviceForm.value.message + '\n');
    this.deviceForm.patchValue(
      {
        message: ""
      }
    );
  }

}
