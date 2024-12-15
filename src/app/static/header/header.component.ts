import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private authServ: AuthService ) {
  }

  

  navigateTo(e: Event) {
    var selectValue = e.target as HTMLSelectElement;
    var route = selectValue.value;
    if (route) this.router.navigate([route]); 
  }
}
