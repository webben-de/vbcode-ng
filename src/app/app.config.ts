import { provideStore } from '@ngxs/store';
import { type ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BarChart, PieChart, RadarChart } from 'echarts/charts';
import { LegendComponent, TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { provideEchartsCore } from 'ngx-echarts';
import { appRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

echarts.use([CanvasRenderer, BarChart, PieChart, RadarChart, TitleComponent, LegendComponent]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withInMemoryScrolling()),
    provideAnimationsAsync(),
    provideEchartsCore({ echarts }),
    provideStore(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
