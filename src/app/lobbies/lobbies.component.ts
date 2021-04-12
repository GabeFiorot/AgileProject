import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import {Game} from '../board/Game';
import {Lobby} from './lobby';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnInit {
  openGames: Lobby[];
  userId:number = -1;
  userName:string = '';
  API_URL:string = "https://agile-chess-api.azurewebsites.net/api/Games/";
  CREATE_URL:string = 'https://agile-chess-api.azurewebsites.net/new?id=';
  JOIN_URL:string = 'https://agile-chess-api.azurewebsites.net/join';
  constructor(private router:Router, private httpClient: HttpClient) {
    this.openGames = [];
   }
  
  ngOnInit(): void {
    this.getGames();
    try {
      this.userId = history.state.data.userId;
      this.userName = history.state.data.username;
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
    if(this.userId <=0)
    {
      alert("You must be logged in to join a game");
      return;
    }
    console.log("Joining game id : " + id);
    this.httpClient
    // note that you gotta put the schedule id in the url string
    //    ?gameId=17&userId=2
    .get<any>(this.JOIN_URL +'?gameId=' + id + '&userId=' +  this.userId)
    .subscribe(res => {
      console.log(res);
      console.log("Joining game id : " + this.userId);
      this.router.navigate(['/game-board'], {state: {data: {gameId : id}}});
    }, err => console.log(err));


  }

  createGame()
  {
    if(this.userId <=0)
    {
      alert("You must be logged in to start a game");
      return;
    }
    var newId;
    // create a game for the current user
    this.httpClient
        // note that you gotta put the schedule id in the url string
        .get<any>(this.CREATE_URL + this.userId)
        .subscribe(res => {
          console.log(res);
          newId = res.gameId;
          console.log("Joining game id : " + this.userId);
          this.router.navigate(['/game-board'], {state: {data: {gameId : newId}}});
        }, err => console.log(err));
    // go to the game
    
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
