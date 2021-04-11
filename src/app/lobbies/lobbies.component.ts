import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import {Game} from '../board/Game'
@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {
  openGames: Game[];
  userId:number = -1;
  API_URL:string = "https://agile-chess-api.azurewebsites.net/api/Games/";
  constructor(private router:Router, private httpClient: HttpClient) {
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
    this.getGames();
    try {
      this.userId = history.state.data.userId;
    } catch (error) {
      console.log('user is not logged in')
    }
    
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

  createGame()
  {
    var id;
    // create a game for the current user
      
    // go to the game
    console.log("Joining game id : " + id);
    this.router.navigate(['/game-board'], {state: {data: {gameId : id}}});
  }

  getGames()
  {
    this.httpClient
        // note that you gotta put the schedule id in the url string
        .get<any>(this.API_URL)
        .subscribe(res => {
          console.log(res);
          this.openGames = res;
        }, err => console.log(err));
  }



}
