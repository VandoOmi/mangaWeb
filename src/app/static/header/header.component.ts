import { AuthService } from './../../../services/auth.service';
import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authServ = inject(AuthService);
  router = inject(Router)
  user: User | null = null;
  isCurrentUserAdmin: boolean = false;
  displayname: string = 'zurück';

  constructor() {}

  ngOnInit(): void {
    this.authServ.currentUser$.subscribe(user => {
      this.user = user;
      if (this.user) {
          this.displayname = this.user.displayName || this.user.email || 'zurück';
          this.authServ.getUserRole(this.user.uid).subscribe(userRole => {
              this.isCurrentUserAdmin = userRole.role === 'admin';
          });
      }
    });
  }

  logout() {
    this.authServ.logout();
    this.isCurrentUserAdmin = false;
    this.router.navigateByUrl('/home');
  }
}
