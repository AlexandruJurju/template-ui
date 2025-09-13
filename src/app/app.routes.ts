import {Routes} from '@angular/router';
import {App} from './app';
import {TestPage} from './features/test-page/test-page';
import {TestSignalr} from './features/test-signalr/test-signalr';

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
  },
  {
    path: "test-signalr",
    component: TestSignalr
  }
];
