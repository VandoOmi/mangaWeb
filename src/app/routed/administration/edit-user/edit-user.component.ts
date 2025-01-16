import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, UserInterface, UserRoleInterface } from '../../../../services/auth.service';
import { AdminLineComponent } from "./admin-line/admin-line.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [RouterLink, AdminLineComponent, NgFor],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  authServ = inject(AuthService);
  admins: UserRoleInterface[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.authServ.getUserRoles().subscribe({
      next: (list) => {
        this.admins = list.filter((e) => e.role === 'admin');
        alert('Benutzerrollen erfolgreich abgerufen.');
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Benutzerrollen:', error);
      }
    });
  }

  deleteUser(user: UserRoleInterface) {
    this.authServ.removeAdminRole(user).subscribe({
      next: () => this.load(),
      error: (error) => console.error('Fehler beim Entfernen der Admin-Rolle:', error)
    });
  }

  reload(bool: boolean): void {
    if (bool) {
      this.load();
    }
  }
}
