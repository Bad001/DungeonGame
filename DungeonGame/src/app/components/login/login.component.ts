import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  // Toggles the visibility of the password
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handles form submission
  onSubmit(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Authentication logic here
  }
}
