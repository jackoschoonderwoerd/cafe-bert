import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';

@Component({
    selector: 'app-dutch-gin',
    imports: [],
    templateUrl: './dutch-gin.component.html',
    styleUrl: './dutch-gin.component.scss'
})
export class DutchGinComponent {
    appStore = inject(AppStore)
}
