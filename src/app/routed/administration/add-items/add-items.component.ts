import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.scss'
})
export class AddItemsComponent {

}
