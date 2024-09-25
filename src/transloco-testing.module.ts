import { TranslocoTestingModule, type TranslocoTestingOptions } from '@jsverse/transloco';
import de from '../public/i18n/de.json';
import en from '../public/i18n/en.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, de },
    translocoConfig: {
      availableLangs: ['en', 'es'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
