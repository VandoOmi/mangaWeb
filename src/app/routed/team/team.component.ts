import { Component } from '@angular/core';
import { WerWirSindComponent } from "./wer-wir-sind/wer-wir-sind.component";
import { WasWirTuenComponent } from "./was-wir-tuen/was-wir-tuen.component";
import { UnsereWerteComponent } from "./unsere-werte/unsere-werte.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [WerWirSindComponent, WasWirTuenComponent, UnsereWerteComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {

}
