import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';

@Component({
    selector: 'app-welcome',
    imports: [],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
    appStore = inject(AppStore)
}
