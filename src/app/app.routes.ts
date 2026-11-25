import { Routes } from '@angular/router';
import { ItemList } from './items/item-list/item-list';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemList },
];
