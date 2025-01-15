import { Router } from '@angular/router';
import { Component, inject, Input } from '@angular/core';
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
  authServ = inject(AuthService)
  router = inject(Router);

  delete(): void {
    if(confirm('Dem Benutzer '+this.admin.uid+'werden alle Adminrechte entzogen.\n Ist das richtig so?')) {
      this.authServ.removeAdminRole(this.admin).subscribe(() => {
        alert('wurde gelöscht');
        this.router.navigateByUrl('/admin');
      });
    }
  }
}
