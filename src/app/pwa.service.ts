import { Injectable } from '@angular/core';
import { type Observable, ReplaySubject, fromEvent, mergeMap, take } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

interface BeforeInstallPrompt extends Event {
  prompt: () => Promise<any>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private beforeInstallPrompt = new ReplaySubject<BeforeInstallPrompt>(1);

  // Catching  the installer prompt for later usage and prevent the default behavior.
  init() {
    // listen to install popup window event
    fromEvent<BeforeInstallPrompt>(window, 'beforeinstallprompt')
      .pipe(take(1))
      .subscribe((beforeInstallPrompt) => {
        beforeInstallPrompt.preventDefault();
        // set prompt for later usage
        this.beforeInstallPrompt.next(beforeInstallPrompt);
      });
  }

  // Show install window
  get prompt(): Observable<any> {
    return this.beforeInstallPrompt.pipe(mergeMap((installer) => fromPromise(installer.prompt())));
  }
}
