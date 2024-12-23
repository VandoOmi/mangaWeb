import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Hier importieren
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  login = true;
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  router = inject(Router);

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

  resize(login:boolean) {
    let container = document.getElementsByClassName("auth-box") as HTMLCollectionOf<HTMLElement>

    if (login) {
      container[0].style.height = "24rem";
    } else {
      container[0].style.height = "29rem";
    }
  }

  onSubmit() {
    try {
      if (this.login) {
        this.authService.login(this.email, this.password).subscribe(
          {
            next: () => {
              alert('Login erfolgreich!');
              this.router.navigateByUrl('/');
            },
            error: (err) => {
              alert('Login fehlgeschlagen!\n'+err)
            }
          }
        );
      } else {
        if (this.password !== this.confirmPassword) {
          alert('Passwörter stimmen nicht überein!');
          return;
        }
        this.authService.registerUser(this.email, this.username, this.password).subscribe(
          {
            next: () => {
              alert('Registrierung erfolgreich!');
              this.router.navigateByUrl('/');
            },
            error: (err) => {
              alert('Registrierung fehlgeschlagen!\n'+err)
            }
          }
        );
        this.toggleLogin();
      }
    } catch (error: any) {
      alert('Fehler: ' + error.message);
    }
  }
}
