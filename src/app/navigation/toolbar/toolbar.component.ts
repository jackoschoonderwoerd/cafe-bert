import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { LanguageSelectorComponent } from '../../shared/language-selector/language-selector.component';

import { AppStore } from '../../app-store/app.store';
import { MatButtonModule } from '@angular/material/button';
import { NavigationStore } from '../navigation-store/navigation.store';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

import { MenuItem } from '../../models/menu-item.model';
import { AuthStore } from '../../auth/auth.store';

@Component({
    selector: 'app-toolbar',
    imports: [
        MatToolbarModule,
        LanguageSelectorComponent,
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        MatIconModule
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    appStore = inject(AppStore);
    authStore = inject(AuthStore)
    navigationStore = inject(NavigationStore);


    @Output() sidenavToggle = new EventEmitter<void>


    onMenu() {
        this.sidenavToggle.emit()
    }
}
