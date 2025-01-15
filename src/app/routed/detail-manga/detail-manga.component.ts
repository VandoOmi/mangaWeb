import { Component, Injectable, Input } from '@angular/core';
import { Manga } from '../../../services/manga.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-detail-manga',
  standalone: true,
  imports: [NgFor],
  templateUrl: './detail-manga.component.html',
  styleUrl: './detail-manga.component.scss'
})
export class DetailMangaComponent {
  @Input() manga!: Manga;
}
