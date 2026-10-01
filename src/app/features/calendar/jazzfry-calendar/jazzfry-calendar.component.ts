import { Component, input } from '@angular/core';
import { Artist } from '../../../models/artist.model';
import { MatTabsModule } from '@angular/material/tabs'
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-jazzfry-calendar',
    imports: [MatTabsModule],
    templateUrl: './jazzfry-calendar.component.html',
    styleUrl: './jazzfry-calendar.component.scss'
})
export class JazzfryCalendarComponent {
    artistEntries = input.required<Artist[]>()
}
