import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, Form} from '@angular/forms';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import {Game} from './Game';
// import { Chess } from '../../../node_modules/chess.js/chess.js';
declare var ChessBoard: any;
//import * as Chess from 'chess.js';
declare var require: any
const Chess = require('chess.js');
// declare var Chess: any;

//const { Chess } = require('chess.js')

// import { ChessInstance } from '~/chess.js'

// ChessReq:any = require('chess.js');
// Chess:ChessInstance = new this.ChessReq();

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  //chat: string = 'Message: hey there \n Message: How\'s it going?\n';
  board: any;
  //game: any;
  game: any = new Chess();
  gameId!:number;
  API_URL:string = 'https://agile-chess-api.azurewebsites.net/api/Games/';
  currentGame!: Game;
  deviceForm: FormGroup;
  obj: any;
  constructor(private httpClient: HttpClient, private fb:FormBuilder, private router:Router) {

      this.deviceForm = this.fb.group({
        message: ['', Validators.required]
      });
      
   }

   onDragStart (source: any, piece: any, position: any, orientation: any) {
     console.log(this.API_URL);
    // do not pick up pieces if the game is over
    if (this.game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
    return null
  }

  onDrop (source:any, target:any) {
    // see if the move is legal
    var move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
    this.updateStatus()
    return null
  }

  onSnapEnd () {
    this.obj.board.position(this.game.fen())
  }

  updateStatus () {
    var status = ''
  
    var moveColor = 'White'
    if (this.game.turn() === 'b') {
      moveColor = 'Black'
    }
  
    // checkmate?
    if (this.game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }
  
    // draw?
    else if (this.game.in_draw()) {
      status = 'Game over, drawn position'
    }
  
    // game still on
    else {
      status = moveColor + ' to move'
  
      // check?
      if (this.game.in_check()) {
        status += ', ' + moveColor + ' is in check'
      }
    }

  }

  getBoard()
  {
    return this.board;
  }

  ngOnInit(): void {
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
      updateStatus: this.updateStatus,
      board: this.getBoard,
      testString: "here I am",
      game : this.game,
      obj : this
    }
    this.board = ChessBoard('board1', config);
    //this.board.game = this.game;
    this.board.newValue = 'hey its me';
    // this.game = new Chess()


    this.gameId = history.state.data.gameId;
    console.log("game " + this.gameId + " entered");
    this.updateGame(this.gameId);
   }

   isOpponentPresent()
   {
     //return ((this.currentGame.playerB == -1) || (this.currentGame.playerW == -1))
     return true;
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