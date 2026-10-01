import {
    computed,
    DestroyRef,
    inject,
    Injectable,
    signal
} from '@angular/core';

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    Firestore,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc
} from '@angular/fire/firestore';
import { CalendarItem } from '../../models/calendar-item.model';
import { AjaxService } from '../ajax/ajax.service';
import { ExternalConcertService } from '../../services/external-concert.service';

// import { CalendarItem } from '../models/calendar-item.model';


@Injectable({
    providedIn: 'root'
})
export class CalendarStore {



    private firestore = inject(Firestore);
    private destroyRef = inject(DestroyRef);

    private _calendarItems = signal<CalendarItem[]>([]);
    private _ajaxCalendarItems = signal<CalendarItem[]>([]);

    private ajaxService = inject(AjaxService);

    private externalConcertService =
        inject(ExternalConcertService);

    // readonly calendarItems = this._calendarItems.asReadonly();

    // readonly calendarItems = computed(() => [
    //     ...this._calendarItems(),
    //     ...this._ajaxCalendarItems(),
    //     ...this.externalConcertService.calendarItems()
    // ]);

    readonly calendarItems = computed(() => [
        ...this._calendarItems(),
        ...this._ajaxCalendarItems(),
        ...this.externalConcertService.calendarItems()
    ]
        .filter(item => item.endsAt >= new Date())
        .sort(
            (a, b) =>
                a.startsAt.getTime() - b.startsAt.getTime()
        ));

    readonly upcomingCalendarItems = computed(() => {

        const now = new Date();

        return this.calendarItems()
            .filter(item =>
                item.visible &&
                item.endsAt >= now
            )
            .sort(
                (a, b) =>
                    a.startsAt.getTime() -
                    b.startsAt.getTime()
            );
    });

    constructor() {

        this.loadFirestoreCalendarItems();
        this.loadAjaxSchedule();

        const calendarRef = collection(
            this.firestore,
            'calendarItems'
        );

        const calendarQuery = query(
            calendarRef,
            orderBy('startsAt', 'asc')
        );

        const unsubscribe = onSnapshot(
            calendarQuery,
            snapshot => {

                const items: CalendarItem[] =
                    snapshot.docs.map(document => {

                        const data = document.data();
                        return {
                            id: document.id,
                            subjectNl: data['subjectNl'],
                            descriptionNl: data['descriptionNl'] ?? '',
                            visible: data['visible'] ?? true,
                            mutable: data['mutable'] ?? true,
                            startsAt:
                                (data['startsAt'] as Timestamp).toDate(),

                            endsAt:
                                (data['endsAt'] as Timestamp).toDate()
                        };
                    });

                this._calendarItems.set(items);
            }
        );

        this.destroyRef.onDestroy(() => unsubscribe());
    }
    private loadFirestoreCalendarItems() {

        const calendarRef = collection(
            this.firestore,
            'calendarItems'
        );

        const calendarQuery = query(
            calendarRef,
            orderBy('startsAt', 'asc')
        );

        const unsubscribe = onSnapshot(
            calendarQuery,
            snapshot => {

                const items: CalendarItem[] =
                    snapshot.docs.map(document => {

                        const data = document.data();

                        return {
                            id: document.id,
                            subjectNl: data['subjectNl'],
                            descriptionNl: data['descriptionNl'] ?? '',
                            visible: data['visible'] ?? true,
                            mutable: data['mutable'] ?? true,

                            startsAt:
                                (data['startsAt'] as Timestamp).toDate(),

                            endsAt:
                                (data['endsAt'] as Timestamp).toDate()
                        };
                    });

                this._calendarItems.set(items);
            }
        );

        this.destroyRef.onDestroy(() => unsubscribe());
    }

    private loadAjaxSchedule() {

        this.ajaxService.getSchedule().subscribe(data => {


            const items: CalendarItem[] = data.events.map((event: any) => {

                const startsAt = new Date(event.date);

                // Temporary assumption: match lasts 2 hours
                const endsAt = new Date(
                    startsAt.getTime() + 2 * 60 * 60 * 1000
                );

                const eventName = this.formatAjaxSubject(event.shortName)

                return {
                    id: `ajax-${event.id}`,
                    subjectNl: eventName,
                    startsAt,
                    endsAt,
                    description: '',
                    visible: true,
                    mutable: false
                };
            });

            this._ajaxCalendarItems.set(items);
        });
    }

    private formatAjaxSubject(value: string): string {
        const teams: Record<string, string> = {
            AJA: 'AJAX',
            TWE: 'TWENTE',
            GRO: 'GRONINGEN',
            SPA: 'SPARTA',
            FEY: 'FEYENOORD',
            UTR: 'FC UTRECHT',
            GAE: 'GO AHEAD EAGELS',
            WIL: 'WILLEM II',
            CAM: 'CAMBUUR',
            TEL: 'TELSTAR',
            ADO: 'ADO DEN HAAG',
            HEE: 'HEEREVEEN',
            EXC: 'EXCELSIOR',
            PEC: 'PEC ZWOLLE'

        };

        // return value.replace(/\b[A-Z]{3}\b/g, code => teams[code] ?? code);
        const [away, home] = value.split('@').map(v => v.trim());

        const format = (code: string) => teams[code] ?? code;

        return `${format(home)} - ${format(away)}`;


    }

    // private formatAjaxSubject(name: string): string {
    //     const teams = name.trim().split(' at ');

    //     if (teams.length !== 2) {
    //         return name.trim();
    //     }

    //     const [away, home] = teams;

    //     const shorten = (team: string) => {
    //         if (team.includes('Ajax')) {
    //             return 'Ajax';
    //         }

    //         return team.trim().split(' ')[0];
    //     };

    //     return `${shorten(home)} - ${shorten(away)}`;
    // }

    // private loadAjaxSchedule() {

    //     this.ajaxService.getSchedule().subscribe(data => {

    //         const items: CalendarItem[] = data.events.map((event: any) => {

    //             const startsAt = new Date(event.date);

    //             const endsAt = new Date(
    //                 startsAt.getTime() + 2 * 60 * 60 * 1000
    //             );

    //             return {
    //                 id: `ajax-${event.id}`,
    //                 subject: this.formatAjaxSubject(event.name),
    //                 startsAt,
    //                 endsAt,
    //                 description: '',
    //                 visible: true,
    //                 mutable: false
    //             };
    //         });

    //         this._ajaxCalendarItems.set(items);
    //     });
    // }


    async addCalendarItem(
        item: Omit<CalendarItem, 'id'>
    ) {

        const calendarRef = collection(
            this.firestore,
            'calendarItems'
        );

        await addDoc(calendarRef, {
            subjectNl: item.subjectNl,
            subjectEn: item.subjectEn ?? '',
            descriptionNl: item.descriptionNl ?? '',
            descriptionEn: item.descriptionEn ?? '',
            visible: item.visible,

            startsAt: Timestamp.fromDate(item.startsAt),
            endsAt: Timestamp.fromDate(item.endsAt)
        })

    }


    async updateCalendarItem(item: CalendarItem) {
        if (!item.id || !item.mutable) {
            return;
        }

        const itemRef = doc(
            this.firestore,
            'calendarItems',
            item.id
        );

        await updateDoc(itemRef, {
            subject: item.subjectNl,
            description: item.descriptionNl ?? '',
            visible: item.visible,
            mutable: item.mutable,
            startsAt: Timestamp.fromDate(item.startsAt),
            endsAt: Timestamp.fromDate(item.endsAt)
        });
    }


    async deleteCalendarItem(item: CalendarItem) {
        console.log(item.id, item.mutable)

        if (!item.id || !item.mutable) {
            return;
        }

        const itemRef = doc(
            this.firestore,
            'calendarItems',
            item.id
        );

        await deleteDoc(itemRef);
    }
}
