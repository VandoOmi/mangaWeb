import { Component, Injectable, Input } from '@angular/core';
import { Manga_Dex } from '../../../services/manga.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-manga',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './detail-manga.component.html',
  styleUrl: './detail-manga.component.scss'
})
export class DetailMangaComponent {
  @Input() manga!: Manga_Dex;
}
