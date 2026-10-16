import { Routes } from '@angular/router';
import { ListClubs } from './clubs/list-clubs/list-clubs';
import { CreateClub } from './clubs/create-club/create-club';


export const routes: Routes = [
  {path: 'clubs', component: ListClubs},
  {path: 'create-club', component: CreateClub},
];
