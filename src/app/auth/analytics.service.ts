import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
    Firestore,
    collection,
    collectionData,
    doc,
    increment,
    orderBy,
    query,
    setDoc
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    private firestore = inject(Firestore);
    private auth = inject(Auth);

    async registerVisit(): Promise<void> {

        if (sessionStorage.getItem('visitRegistered')) {
            return;
        }

        await this.auth.authStateReady();

        const loggedIn = !!this.auth.currentUser;

        const today = new Date();

        const date = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');

        const ref = doc(this.firestore, `analytics/${date}`);

        await setDoc(
            ref,
            {
                total: increment(1),
                loggedIn: increment(loggedIn ? 1 : 0),
                loggedOut: increment(loggedIn ? 0 : 1)
            },
            { merge: true }
        );

        sessionStorage.setItem('visitRegistered', 'true');
    }
    getAnalytics() {

        const ref = collection(this.firestore, 'analytics');

        const q = query(
            ref,
            orderBy('__name__', 'desc')
        );

        return collectionData(q, {
            idField: 'id'
        });
    }
}
