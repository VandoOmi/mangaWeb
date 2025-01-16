import { Component, Input, NgModule } from '@angular/core';
import { Manga_Dex } from '../../../../services/manga.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-manga-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './manga-box.component.html',
  styleUrls: ['./manga-box.component.scss']
})
export class MangaBoxComponent {
  @Input() manga!: Manga_Dex;
  @Input() selectedStyle: string = 'list';
}