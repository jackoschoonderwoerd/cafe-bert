import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { NavigationService } from '../XXXnavigation.service';
import { AppStore } from '../../app-store/app.store';
import { MatButtonModule } from '@angular/material/button';
import { NavigationStore } from '../navigation-store/navigation.store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-sidenav',
    imports: [MatIconModule, MatListModule, RouterLink, MatButtonModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
    @Output() closeSidenav = new EventEmitter<void>
    navigationService = inject(NavigationService)
    appStore = inject(AppStore)
    navigationStore = inject(NavigationStore)

    menuItems: MenuItem[]
    // navigationSvc = inject(NavigationService)


    ngOnInit(): void {
        this.menuItems = this.navigationService.getMenuItems()
    }

    onCloseSidenav() {
        this.closeSidenav.emit()
    }
}
