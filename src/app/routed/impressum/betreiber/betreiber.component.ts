import { Component } from '@angular/core';
import { AddresseComponent } from "../addresse/addresse.component";

@Component({
  selector: 'app-betreiber',
  standalone: true,
  imports: [AddresseComponent],
  templateUrl: './betreiber.component.html',
  styleUrl: './betreiber.component.scss'
})
export class BetreiberComponent {

}
