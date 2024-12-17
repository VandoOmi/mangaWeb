import { Component } from '@angular/core';
import { HeaderComponent } from "../../static/header/header.component";
import { FooterComponent } from "../../static/footer/footer.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
