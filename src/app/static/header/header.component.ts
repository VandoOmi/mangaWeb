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

  constructor() {}

  ngOnInit(): void {
    this.authServ.currentUser$.subscribe( user => {
      this.user = user;
    })
    this.authServ.getUserRole(this.user?.uid || '').subscribe( user => {
      this.isCurrentUserAdmin = user.role === 'admin';
    })
  }

  navigateTo(e: Event) {
    var selectValue = e.target as HTMLSelectElement;
    var route = selectValue.value;
    if (route) this.router.navigate([route]);
  }

  
}
