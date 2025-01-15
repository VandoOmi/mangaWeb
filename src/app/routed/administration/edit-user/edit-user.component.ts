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
    this.authServ.getUserRoles().subscribe(
      (list) => {
        this.admins = list.filter((e) => e.role === 'admin');
      },
      (error) => {
        console.error('Fehler beim Abrufen der Benutzerrollen:', error);
      }
    );
  }
}
