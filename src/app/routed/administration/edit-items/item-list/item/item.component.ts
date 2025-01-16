import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MangaService, Manga_DB } from '../../../../../../services/manga.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})

export class ItemComponent {
  mangaServ = inject(MangaService)
  router = inject(Router);
  @Input() item!:Manga_DB;
  @Output() load = new EventEmitter<boolean>();

  edit(): void {
    this.router.navigateByUrl('/editItem');
  }

  delete():void {
    this.mangaServ.deleteManga(this.item.manga_id).subscribe();
    this.load.emit(true);
  }
}
