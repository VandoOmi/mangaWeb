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
  mangaServ = inject(MangaService);

  openDetail() {
    this.router.navigateByUrl('detailManga');
  }
  mangas: Manga[]=[];
  selectedStyle: string = 'list'; 
  constructor() {}

  ngOnInit(): void {
    /*this.mangaServ.getMangas().subscribe(mangalist => {
      this.mangas = mangalist;
    })*/
  }

  apply(style: string): void {
    this.selectedStyle = style;
    
  }
}
