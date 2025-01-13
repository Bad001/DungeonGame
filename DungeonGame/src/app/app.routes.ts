import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game', component: GameComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'signin', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect '' to 'home'
    {path: '**', component: PageNotFoundComponent}
];
