import {
  type ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideEchartsCore } from 'ngx-echarts';
import { BarChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
echarts.use([BarChart]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideEchartsCore({ echarts }),
  ],
};
