import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppStore } from './app-store/app.store';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { DrinksComponent } from './features/drinks/drinks.component';
import { DrinkCategoryStore } from './features/drinks/drink-category/drink-category-store/drink-category-store';
import { FooterComponent } from './navigation/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { UpdateService } from './services/update.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ToolbarComponent,
        FooterComponent,
        MatSidenavModule,
        SidenavComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'cafe-bert';
    appStore = inject(AppStore);
    drinkCategoryStore = inject(DrinkCategoryStore);

    private updateService = inject(UpdateService);

    ngOnInit(): void {
        this.appStore.getDrinks();
        this.drinkCategoryStore.getSortedDrinkCategories();
    }
}
