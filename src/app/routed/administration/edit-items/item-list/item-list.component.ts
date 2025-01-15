import { Component, inject } from '@angular/core';
import { ItemComponent } from "./item/item.component";
import { NgForOf } from '@angular/common';
import { Manga, MangaService } from '../../../../../services/manga.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, NgForOf],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  private mangaServ: MangaService = inject(MangaService);
  mangaList: Manga[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.mangaList = this.mangaServ.getMangaList();
  }
}
