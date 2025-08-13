import {Routes} from '@angular/router';
import {App} from './app';
import {TestPage} from './features/test-page/test-page';

export const ROUTES = {
  HOME: 'home',
  TEST: 'test',
}

export const routes: Routes = [
  {
    path: ROUTES.HOME,
    component: App,
  },
  {
    path: ROUTES.TEST,
    component: TestPage,
  }
];
