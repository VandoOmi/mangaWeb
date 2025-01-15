import { Router } from '@angular/router';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService, UserInterface, UserRoleInterface } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-line',
  standalone: true,
  imports: [],
  templateUrl: './admin-line.component.html',
  styleUrl: './admin-line.component.scss'
})
export class AdminLineComponent {
  @Input({required: true}) admin!: UserRoleInterface;
  @Output() deleteAdmin = new EventEmitter<boolean>();
  authServ = inject(AuthService)
  router = inject(Router);

  delete(): void {
    if(confirm('Dem Benutzer '+this.admin.email+'werden alle Adminrechte entzogen.\n Ist das richtig so?')) {
      this.authServ.removeAdminRole(this.admin).subscribe({
        next: () => {
          alert(this.admin.email+' wurden erfolgreich die Rechte entzogen.');
          this.deleteAdmin.emit(true);
        }
        ,
        error: (error) => console.error('Fehler beim Entfernen der Admin-Rolle:', error)
      });
    }
  }
}
