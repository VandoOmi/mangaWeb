import { Component, Input, NgModule } from '@angular/core';
import { Manga_Dex } from '../../../../services/manga.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-box',
  templateUrl: './manga-box.component.html',
  styleUrls: ['./manga-box.component.scss']
})
export class MangaBoxComponent {
  @Input() manga!: Manga_Dex;
  @Input() selectedStyle: string = 'list';
}

@NgModule({
  declarations: [MangaBoxComponent],
  imports: [CommonModule],
  exports: [MangaBoxComponent]
})
export class MangaBoxModule {}