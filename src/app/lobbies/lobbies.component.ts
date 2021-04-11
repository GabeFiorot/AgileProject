import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Game} from '../board/Game'
@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {
  openGames: Game[];
  constructor(private router:Router) {
    this.openGames = [{
      "gameId": 4,
      "playerW": 1,
      "playerB": 2,
      "pgn": "",
      "fen": "poggers",
      "chat": "hi there"
  },{
    "gameId": 5,
    "playerW": 2,
    "playerB": 1,
    "pgn": "",
    "fen": "poggers",
    "chat": "oh hello jeff"
}];
   }
  
  ngOnInit(): void {
  }

  gotoGame()
  {
    console.log("Nice")
    this.router.navigate(['/game-board'], {state: {data: {gameId : 4}}});
  }

  enterGame(id:number)
  {
    console.log("Joining game id : " + id);
    this.router.navigate(['/game-board'], {state: {data: {gameId : id}}});
  }
}
