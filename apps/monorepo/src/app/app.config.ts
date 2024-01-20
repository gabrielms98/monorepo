import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

class MyErrorHandling implements ErrorHandler {
  handleError(error: unknown): void {
    console.log(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    {
      provide: ErrorHandler,
      useClass: MyErrorHandling,
    },
  ],
};
