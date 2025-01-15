import { Component, inject } from '@angular/core';
import { MangaBoxComponent, MangaBoxModule } from "./manga-box/manga-box.component";
import { Manga_Dex, MangaService } from '../../../services/manga.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MangaBoxModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  router = inject(Router);

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
