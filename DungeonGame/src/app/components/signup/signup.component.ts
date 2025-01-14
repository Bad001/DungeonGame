import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, HttpClientModule],
  providers: [AuthService, SnackbarService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  nickname: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackbar: SnackbarService) {}
  
  onPasswordChange() {
    if (this.password === '') {
      this.confirmPassword = ''; // Clear confirmPassword when password is empty
    }
  }

  // Toggles the visibility of the password
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handles form submission
  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.password = '';
      this.confirmPassword = '';
      this.snackbar.openSnackBar('Passwords don\'t match!');
      return;
    }
    this.authService.signup(this.email, this.nickname, this.password).subscribe({
      next: (message) => {
        this.snackbar.openSnackBar(message, 'Ok');
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.snackbar.openSnackBar(error.error);
      }
    });
  }
}
