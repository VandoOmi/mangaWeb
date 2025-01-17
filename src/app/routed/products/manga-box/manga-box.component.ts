import { Component, Input, NgModule } from '@angular/core';
import { Manga_Dex } from '../../../../services/manga.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './manga-box.component.html',
  styleUrls: ['./manga-box.component.scss']
})
export class MangaBoxComponent {
  constructor(private router:Router) {}
  @Input() manga!: Manga_Dex;
  @Input() selectedStyle: string = 'list';
  navigateToPage(input: Manga_Dex): void { 
    this.router.navigate(['/detailManga'], { queryParams: { manga: JSON.stringify(this.manga) } }); 
  }
}