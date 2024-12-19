import { Component } from '@angular/core';
import { MangaBoxComponent } from "./manga-box/manga-box.component";
import { Manga, MangaService } from '../../../services/manga.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ MangaBoxComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  mangas: Manga[];

  constructor(mangaServ: MangaService) {
    this.mangas = mangaServ.mangalist;
  }
}
