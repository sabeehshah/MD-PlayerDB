import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AddPlayerComponent} from './components/add-player/add-player.component';
import {EditPlayerComponent} from './components/edit-player/edit-player.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PlayerDetailsComponent} from './components/player-details/player-details.component';
import { SettingsComponent } from './components/settings/settings.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'player/add', component: AddPlayerComponent, canActivate:[AuthGuard] },
  {path: 'player/edit/:id', component: EditPlayerComponent, canActivate:[AuthGuard] },
  {path: 'player/:id', component: PlayerDetailsComponent, canActivate:[AuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
 providers: [AuthGuard]
})
export class AppRoutingModule { }
