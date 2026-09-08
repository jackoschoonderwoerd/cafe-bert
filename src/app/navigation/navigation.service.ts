import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor() { }

    menuItems: MenuItem[] = [
        {
            nl: 'dranken',
            en: 'drinks',
            link: 'drinks'
        },
        {
            nl: 'menu',
            en: 'menu',
            link: 'menu'
        },

    ]
    getMenuItems() {
        return this.menuItems
    }

}
