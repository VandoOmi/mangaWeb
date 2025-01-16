import { Component, inject } from '@angular/core';
import { ItemComponent } from "./item/item.component";
import { NgForOf } from '@angular/common';
import { MangaService, Manga_DB } from '../../../../../services/manga.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, NgForOf],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  private mangaServ: MangaService = inject(MangaService);
  mangaList: Manga_DB[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.mangaServ.getManga_DbByIds().subscribe({
      next: mangas => {
        this.mangaList = mangas;
      },
      error: error => {
        console.error(error);
        throw new Error('Manga_DB not Found');
      
      }
    });
  }
}
