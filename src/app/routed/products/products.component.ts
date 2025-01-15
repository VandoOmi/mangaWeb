import { Component } from '@angular/core';
import { MangaBoxComponent, MangaBoxModule } from "./manga-box/manga-box.component";
import { Manga, MangaService } from '../../../services/manga.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MangaBoxModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
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
