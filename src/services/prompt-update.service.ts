import { Injectable } from '@angular/core';
import type { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {
  constructor(private update: SwUpdate) {
    this.update.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')).subscribe((evt) => {
      // if (promptUser(evt)) {
      // Reload the page to update to the latest version.
      document.location.reload();
      // }
    });
  }
}
