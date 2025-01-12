import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  nickname: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

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
      alert('Passwords do not match!');
      return;
    }
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Authentication logic here
  }
}
