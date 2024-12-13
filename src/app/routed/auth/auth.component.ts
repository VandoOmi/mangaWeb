import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Hier importieren
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  login = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  toggleLogin() {
    this.login = !this.login;
    this.resetForm();
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  async onSubmit() {
    try {
      if (this.login) {
        // Login
        await this.authService.login(this.email, this.password);
        alert('Login erfolgreich!');
      } else {
        // Registrierung
        if (this.password !== this.confirmPassword) {
          alert('Passwörter stimmen nicht überein!');
          return;
        }
        await this.authService.registerUser(this.email, this.password);
        alert('Registrierung erfolgreich!');
        this.toggleLogin();
      }
    } catch (error: any) {
      alert('Fehler: ' + error.message);
    }
  }
}
