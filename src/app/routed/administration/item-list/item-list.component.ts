import { Component } from '@angular/core';
import { Manga, MangaService } from '../../../../services/manga.service';
import { ItemComponent } from "./item/item.component";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {

  mangaList: Array<Manga>;

  constructor() {
    this.mangaList = MangaService.mangaList || [];
  }
}
