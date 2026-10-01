import { Component, inject, signal } from '@angular/core';
import { AjaxService } from './ajax.service';
import { AjaxScheduleComponent } from './ajax-schedule/ajax-schedule.component';
import { AppStore } from '../../app-store/app.store';

@Component({
    selector: 'app-ajax',
    imports: [AjaxScheduleComponent],
    templateUrl: './ajax.component.html',
    styleUrl: './ajax.component.scss'
})
export class AjaxComponent {
    private ajaxService = inject(AjaxService);
    appStore = inject(AppStore)

    schedule = signal<any>(null);

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
