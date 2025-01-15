import { Component, Input } from '@angular/core';
import { Manga } from '../../../../../../services/manga.service';


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() item?:Manga;

}
