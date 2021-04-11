import { Component, OnInit } from '@angular/core';

declare var ChessBoard: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  chat: string = 'Message: hey there';
  board: any;
  constructor() { }

  ngOnInit(): void {
    
    this.board = ChessBoard('board1', {
      position: 'start',
      draggable: true
    })
    
  }

}
