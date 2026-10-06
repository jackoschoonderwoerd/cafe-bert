import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';
import { DrinksStore } from '../drinks/drinks-store/drinks-store';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { DrinkCategoryComponent } from '../drinks/drink-category/drink-category.component';
import { DrinkComponent } from '../drinks/drink-category/drink/drink.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dutch-gin',
    imports: [
        CurrencyPipe,
        MatButtonModule
    ],
    templateUrl: './dutch-gin.component.html',
    styleUrl: './dutch-gin.component.scss'
})
export class DutchGinComponent {
    appStore = inject(AppStore);
    drinksStore = inject(DrinksStore);
    router = inject(Router)

    toVanWeesCategory() {
        this.router.navigate(['quick-access-category', 'n8gyvb2Ud0GVZcyjyFPI'])
    }
}
