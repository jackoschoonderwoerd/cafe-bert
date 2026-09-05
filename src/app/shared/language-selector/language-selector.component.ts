import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-language-selector',
    imports: [NgClass],
    templateUrl: './language-selector.component.html',
    styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    appStore = inject(AppStore)
}
