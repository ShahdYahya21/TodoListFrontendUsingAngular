import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './AppComponent/app';
import { provideHttpClient } from '@angular/common/http';

// appConfig to provide HttpClientModule
export const appConfig = {
  providers: [
    provideHttpClient(), // Provide HttpClientModule for the app
  ]
};

// Bootstrapping the application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
