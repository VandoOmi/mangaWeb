import { Component, Input } from '@angular/core';
import { Manga } from '../../../../services/manga.service';

@Component({
  selector: 'app-manga-box',
  standalone: true,
  imports: [],
  templateUrl: './manga-box.component.html',
  styleUrl: './manga-box.component.scss'
})
export class MangaBoxComponent {
  @Input() manga!: Manga;
}
