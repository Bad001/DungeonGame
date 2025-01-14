import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game', component: GameComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'signin', component: LoginComponent, canActivate: [authGuard]},
    {path: 'signup', component: SignupComponent, canActivate: [authGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect '' to 'home'
    {path: '**', component: PageNotFoundComponent}
];
