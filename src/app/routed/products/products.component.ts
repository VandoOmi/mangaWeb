import { Component, inject } from '@angular/core';
import { Manga_Dex, MangaService } from '../../../services/manga.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MangaBoxComponent } from "./manga-box/manga-box.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MangaBoxComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  router = inject(Router);
  mangaServ = inject(MangaService);

  openDetail() {
    this.router.navigateByUrl('detailManga');
  }
  mangas: Manga_Dex[] = [];
  selectedStyle: string = 'list';

  constructor() {}


  apply(style: string): void {
    this.selectedStyle = style;
    
  }
}
