import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { BoardComponent } from './board/board.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path: '', component: LobbiesComponent},
  {path: 'game-board', component: BoardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},

  //default redirect
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
