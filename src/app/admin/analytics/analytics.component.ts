import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../auth/analytics.service';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-analytics',
    imports: [],
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

    analyticsService = inject(AnalyticsService)
    analytics = toSignal(
        this.analyticsService.getAnalytics(),
        { initialValue: [] }
    );
}
