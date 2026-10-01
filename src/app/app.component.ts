import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppStore } from './app-store/app.store';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';


import { FooterComponent } from './navigation/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { UpdateService } from './services/update.service';
import { AnalyticsService } from './auth/analytics.service';
import { FoodCategoryStore } from './features/food/food-store/food-store';
import { DrinksStore } from './features/drinks/drinks-store/drinks-store';
import { MatDialog } from '@angular/material/dialog';
import { QuickAccessDialogComponent } from './features/quick-access-dialog/quick-access-dialog.component';

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
    drinksStore = inject(DrinksStore);
    foodCategoryStore = inject(FoodCategoryStore);
    matDialog = inject(MatDialog)

    // private updateService = inject(UpdateService);
    private analytics = inject(AnalyticsService);

    constructor() {
        inject(UpdateService);
        this.analytics.registerVisit();
    }

    ngOnInit(): void {

        this.appStore.getDrinks();
        this.drinksStore.getDrinkCategories();
        this.foodCategoryStore.getSortedFoodCategories();
        // this.matDialog.open(QuickAccessDialogComponent);

    }
}
