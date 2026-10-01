import { ApplicationConfig, provideZoneChangeDetection, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
    initializeFirestore,
    provideFirestore,
} from '@angular/fire/firestore';
import { getApp } from '@angular/fire/app';
import { environment } from '../environments/environment.prod';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';

import { provideQuillConfig } from 'ngx-quill/config';
import { provideNativeDateAdapter } from '@angular/material/core';


export const appConfig: ApplicationConfig = {
    // providers: [
    //     provideZoneChangeDetection({ eventCoalescing: true }),
    //     provideRouter(routes),
    //     provideFirebaseApp(() => initializeApp(environment.firebase)),
    //     provideAuth(() => getAuth()),
    //     provideFirestore(() => getFirestore()),
    //     provideServiceWorker('ngsw-worker.js', {
    //         enabled: !isDevMode(),
    //         registrationStrategy: 'registerImmediately'

    //     })
    // ]
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),

        provideFirestore(() =>
            initializeFirestore(getApp(), {
                experimentalForceLongPolling: true
            })
        ),
        provideHttpClient(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerImmediately'
        }),
        provideQuillConfig({
            modules: {
                toolbar: [
                    ['bold', 'italic'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link'],
                    ['clean']
                ]
            }
        }),
        provideNativeDateAdapter()
    ]
    // {
    //     provide: LOCALE_ID,
    //     useValue: 'nl-NL'
    // },

};
