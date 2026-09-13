import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';
import { SocialMediaComponent } from '../../shared/social-media/social-media.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

interface OpeningTime {
    nl: string;
    en: string;
    openNl: string;
    openEn: string;
    closeNl: string
    closeEn: string
}
@Component({
    selector: 'app-home',
    imports: [SocialMediaComponent, MatIconModule, RouterLink, NgClass],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})


export class HomeComponent {
    openingTimes: OpeningTime[] = [
        {
            nl: 'maandag',
            en: 'Monday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '01:00',
            closeEn: '1:00 AM'
        },
        {
            nl: 'dinsdag',
            en: 'Tuesday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '01:00',
            closeEn: '1:00 AM'
        },
        {
            nl: 'woensdag',
            en: 'WednesDay',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '01:00',
            closeEn: '1:00 AM'
        },
        {
            nl: 'donderdag',
            en: 'Thursday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '01:00',
            closeEn: '1:00 AM'
        },
        {
            nl: 'vrijdag',
            en: 'Friday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '02:00',
            closeEn: '2:00 AM'
        },
        {
            nl: 'zaterdag',
            en: 'Saturday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '02:00',
            closeEn: '2:00 AM'
        },
        {
            nl: 'zondag',
            en: 'Sunday',
            openNl: '11:30',
            openEn: '11:30 AM',
            closeNl: '23:00',
            closeEn: '11:00 PM'
        }
    ]
    appStore = inject(AppStore)
}
