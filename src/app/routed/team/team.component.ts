import { Component } from '@angular/core';
import { WerWirSindComponent } from "./wer-wir-sind/wer-wir-sind.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [WerWirSindComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {

}
