import {
  ApplicationConfig,
  ErrorHandler,
  Injectable,
  OnDestroy,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { Subject } from 'rxjs/internal/Subject';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';

@Injectable({ providedIn: 'root' })
class MyErrorHandling implements ErrorHandler, OnDestroy {
  readonly THROTTLE_TIME = 1_000;
  private error = new Subject<Error>();
  private error$ = this.error
    .asObservable()
    .pipe(throttleTime(this.THROTTLE_TIME));

  constructor() {
    this.error$.subscribe((error) => {
      console.log(error);
      // TODO: send error to server
    });
  }

  handleError(error: Error): void {
    this.error.next(error);
  }

  ngOnDestroy(): void {
    this.error.complete();
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
