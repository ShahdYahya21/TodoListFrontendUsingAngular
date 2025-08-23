import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './AppComponent/app.config';
import { AppComponent } from './AppComponent/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
