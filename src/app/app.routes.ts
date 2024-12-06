import { Routes } from '@angular/router';
import { HomeComponent } from './routed/home/home.component';
import { AdministraionComponent } from './routed/administration/administraion.component';
import { DatenschutzComponent } from './routed/datenschutz/datenschutz.component';
import { ImpressumComponent } from './routed/impressum/impressum.component';
import { ProductsComponent } from './routed/products/products.component';
import { TeamComponent } from './routed/team/team.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'administration',
    component: AdministraionComponent
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];
