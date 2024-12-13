import { Routes } from '@angular/router';
import { HomeComponent } from './routed/home/home.component';
import { AdministraionComponent } from './routed/administration/administraion.component';
import { DatenschutzComponent } from './routed/datenschutz/datenschutz.component';
import { ImpressumComponent } from './routed/impressum/impressum.component';
import { ProductsComponent } from './routed/products/products.component';
import { TeamComponent } from './routed/team/team.component';
import { AddItemsComponent } from './routed/administration/add-items/add-items.component';
import { DeleteItemsComponent } from './routed/administration/delete-items/delete-items.component';
import { EditItemsComponent } from './routed/administration/edit-items/edit-items.component';
import { EditUserComponent } from './routed/administration/edit-user/edit-user.component';
import { roleGuard } from '../services/guards/role.guard';
import { AuthComponent } from './routed/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'administration',
    component: AdministraionComponent,
    canActivate: [roleGuard],
    data: { role: 'admin' },
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
    path: 'add-item',
    component: AddItemsComponent
  },
  {
    path: 'delete-item',
    component: DeleteItemsComponent
  },
  {
    path: 'edit-item',
    component: EditItemsComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [roleGuard],
    data: { role: 'admin' },
  },
  {
    path: '**',
    component: HomeComponent
  }
];
