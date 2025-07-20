import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import Aura from '@primeng/themes/aura'; 
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(IonicStorageModule.forRoot()),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideHttpClient(),
    ]
};
