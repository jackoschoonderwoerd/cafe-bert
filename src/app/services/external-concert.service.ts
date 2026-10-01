import { Injectable, signal } from '@angular/core';

import {
    initializeApp
} from 'firebase/app';

import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    getDoc,
    doc
} from 'firebase/firestore';

import { environment } from '../../environments/environment';

import { CalendarItem } from '../models/calendar-item.model';
import { ExternalConcert } from '../models/external-concert.model';
import { ConcertArtistEntry } from '../models/concert-artist-entry.model';

@Injectable({
    providedIn: 'root'
})
export class ExternalConcertService {

    private concertsApp = initializeApp(
        environment.concertsFirebase,
        'concerts-app'
    );

    private firestore = getFirestore(
        this.concertsApp
    );

    private _calendarItems =
        signal<CalendarItem[]>([]);

    readonly calendarItems =
        this._calendarItems.asReadonly();


    constructor() {
        this.loadConcerts();

    }


    private loadConcerts() {

        const concertsRef = collection(
            this.firestore,
            'jazzbert-concerts'
        );

        const concertsQuery = query(
            concertsRef,
            orderBy('startAt', 'asc')
        );

        onSnapshot(

            concertsQuery,
            async snapshot => {
                const items = await Promise.all(
                    snapshot.docs.map(async document => {

                        const concert = {
                            id: document.id,
                            ...document.data()
                        } as ExternalConcert;

                        const artists = await this.loadArtists(
                            concert.artistEntries
                        );

                        return {
                            id: `concert-${concert.id}`,
                            subjectNl: 'Jazzfry',
                            startsAt: concert.startAt.toDate(),
                            endsAt: concert.endAt.toDate(),
                            visible: true,
                            mutable: false,
                            artistEntries: artists
                        };
                    })
                );

                this._calendarItems.set(items);

                // const items: CalendarItem[] =
                //     snapshot.docs.map(document => {
                //         const concert = {
                //             id: document.id,
                //             ...document.data()
                //         } as ExternalConcert;
                //         return {
                //             id: `concert-${concert.id}`,

                //             subject: 'Jazzfry',

                //             startsAt:
                //                 concert.startAt.toDate(),

                //             endsAt:
                //                 concert.endAt.toDate(),

                //             artistEntries: this.loadArtists(concert.artistEntries),

                //             visible: true,

                //             mutable: false
                //         };
                //     });

                // this._calendarItems.set(items);
            }
        );
    }
    async loadArtists(artistEntries: ConcertArtistEntry[]) {

        const artists = []

        for (const entry of artistEntries) {

            const artistRef = doc(
                this.firestore,
                'jazzbert-artists',
                entry.artistId
            );

            const artistSnap = await getDoc(artistRef);

            if (artistSnap.exists()) {

                artists.push(artistSnap.data());
            }
        }
        return artists

        // artistEntries.forEach((entry:ConcertArtistEntry) => {
        //     const artistRef = doc(
        //         this.firestore,
        //         `jazzbert-artists/${entry.artistId}`
        //     )
        //     const artistSnap = await getDoc(artistRef);

        //     if (artistSnap.exists()) {
        //         console.log(artistSnap.data());
        //     }
        // })

        // console.log(artistEntries)

        // const concertsRef = collection(
        //     this.firestore,
        //     'jazzbert-artists'
        // );

        // const concertsQuery = query(
        //     concertsRef,
        //     orderBy('startAt', 'asc')
        // );

    }
}
