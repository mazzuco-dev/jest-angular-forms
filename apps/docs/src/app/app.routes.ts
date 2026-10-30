import { Routes } from '@angular/router';
import { DocsPageComponent } from './components/docs-page/docs-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DocsPageComponent,
    pathMatch: 'full',
  },
];
