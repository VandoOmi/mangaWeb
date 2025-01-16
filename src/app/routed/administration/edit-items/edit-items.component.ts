import { Component } from '@angular/core';
import { ItemListComponent } from "./item-list/item-list.component";

@Component({
  selector: 'app-edit-items',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './edit-items.component.html',
  styleUrl: './edit-items.component.scss'
})
export class EditItemsComponent {

}
