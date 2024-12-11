import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./static/header/header.component";
import { FooterComponent } from "./static/footer/footer.component";
import { MangaService } from '../services/manga.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mangaWeb';

  constructor(mangaServ: MangaService) {
    MangaService.init();
  }
}
