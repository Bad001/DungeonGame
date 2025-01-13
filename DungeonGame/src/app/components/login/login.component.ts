import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  providers: [AuthService, SnackbarService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackbar: SnackbarService) {}

  // Toggles the visibility of the password
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handles form submission
  onSubmit(): void {
    this.authService.signin(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/home']);  // Redirect after successful login
      },
      error: error => {
        this.snackbar.openSnackBar(error.error);
      }
    });
  }
}
