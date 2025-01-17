import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Manga_Dex } from '../../../services/manga.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-manga',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './detail-manga.component.html',
  styleUrls: ['./detail-manga.component.scss']
})
export class DetailMangaComponent implements OnInit {
  manga!: Manga_Dex;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const mangaString = params.get('manga');
      if (mangaString) {
        this.manga = JSON.parse(mangaString);
        console.log(this.manga)
      }
    });
  }
}
