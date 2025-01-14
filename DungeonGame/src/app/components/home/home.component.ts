import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf, HttpClientModule],
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private authService: AuthService) {}

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
