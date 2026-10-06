import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';

import { AppStore } from '../../app-store/app.store';
import { MatButtonModule } from '@angular/material/button';
import { NavigationStore } from '../navigation-store/navigation.store';
import { JsonPipe } from '@angular/common';
import { NewsStore } from '../../shared/news/news.store';
import { AuthStore } from '../../auth/auth.store';

@Component({
    selector: 'app-sidenav',
    imports: [MatIconModule, MatListModule, RouterLink, MatButtonModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
    @Output() closeSidenav = new EventEmitter<void>

    appStore = inject(AppStore)
    navigationStore = inject(NavigationStore);
    newsStore = inject(NewsStore)
    authStore = inject(AuthStore)





    onCloseSidenav() {
        this.closeSidenav.emit()
    }
}
