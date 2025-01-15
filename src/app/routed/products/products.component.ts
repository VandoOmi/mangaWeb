import { Component, inject } from '@angular/core';
import { MangaBoxComponent, MangaBoxModule } from "./manga-box/manga-box.component";
import { Manga, MangaService } from '../../../services/manga.service';
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
  mangas: Manga[];
  selectedStyle: string = 'style1'; 
  onSelectionChange(event: Event) { 
    const selectElement = event.target as HTMLSelectElement; 
    this.selectedStyle = selectElement.value; 
  }
  constructor(mangaServ: MangaService) {
    this.mangas = mangaServ.mangalist;
  }

  apply(style: string): void {
    this.selectedStyle = style;
  }
}
