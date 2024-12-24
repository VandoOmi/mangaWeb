import { Component } from '@angular/core';
import { Manga, MangaService } from '../../../../services/manga.service';
import { ItemComponent } from "./item/item.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, NgForOf],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {

  mangaList: Array<Manga>;

  constructor(mangaServ: MangaService) {
    this.mangaList = mangaServ.mangalist || [];
  }
}
