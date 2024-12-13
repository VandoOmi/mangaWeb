import { Component } from '@angular/core';
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
  constructor(private router: Router) {}

  navigateTo(e: Event) {
    var selectValue = e.target as HTMLSelectElement;
    var route = selectValue.value;
    if (route) this.router.navigate([route]); 
  }
}
