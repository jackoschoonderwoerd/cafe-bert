import { Component, inject, signal } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { AppStore } from '../../../app-store/app.store';

@Component({
    selector: 'app-ajax-schedule',
    imports: [DatePipe],
    templateUrl: './ajax-schedule.component.html',
    styleUrl: './ajax-schedule.component.scss'
})
export class AjaxScheduleComponent {
    private ajaxService = inject(AjaxService);

    schedule = signal<any>(null);
    appStore = inject(AppStore)

    ngOnInit() {
        this.ajaxService.getSchedule().subscribe({
            next: data => {
                console.log(data);
                this.schedule.set(data);
            },
            error: err => {
                console.error(err);
            }
        });
    }
}
