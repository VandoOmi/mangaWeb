import { Component, inject } from '@angular/core';
import { Manga_Dex, MangaService } from '../../../services/manga.service';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MangaBoxComponent } from "./manga-box/manga-box.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MangaBoxComponent, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  router = inject(Router);
  mangaServ = inject(MangaService);
  mangas: Manga_Dex[] = [];
  selectedStyle: string = 'list';

  constructor() {}

  ngOnInit(): void {
    this.mangaServ.getLatestManga_Dex().subscribe({
      next: mangaList => {
        this.mangas = mangaList;
      },
      error: error => {
        console.error(error);
        throw new Error('Cant find Mangas');
      }
    })
  }

  apply(style: string): void {
    this.selectedStyle = style;
  }
  
  openDetail() {
    this.router.navigateByUrl('detailManga');
  }
}
