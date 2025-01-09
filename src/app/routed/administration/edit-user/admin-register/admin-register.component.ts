import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss'
})
export class AdminRegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  router = inject(Router);
  authServ = inject(AuthService);

  constructor() {}

  resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    try {
      if (this.password !== this.confirmPassword) {
        alert('Passwörter stimmen nicht überein!');
        return;
      }
      this.authServ.registerAdmin(this.email, this.username, this.password).subscribe(
        {
          next: () => {
            alert('Registrierung erfolgreich!');
            this.router.navigateByUrl('/');
          },
          error: (err: any) => {
            alert('Registrierung fehlgeschlagen!\n'+err)
          }
        }
      );
    } catch (error: any) {
      alert('Fehler: ' + error.message);
    }
    this.router.navigateByUrl('/editAdmin');
  }
}
