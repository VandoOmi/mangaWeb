import { Component } from '@angular/core';
import { BetreiberComponent } from "./betreiber/betreiber.component";
import { AddresseComponent } from "./addresse/addresse.component";
import { KontaktComponent } from "./kontakt/kontakt.component";

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [BetreiberComponent, AddresseComponent, KontaktComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

}
