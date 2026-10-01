import { Component, inject } from '@angular/core';
import { AppStore } from '../../app-store/app.store';
import { DrinksStore } from '../drinks/drinks-store/drinks-store';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { DrinkCategoryComponent } from '../drinks/drink-category/drink-category.component';
import { DrinkComponent } from '../drinks/drink-category/drink/drink.component';

@Component({
    selector: 'app-dutch-gin',
    imports: [
        CurrencyPipe
    ],
    templateUrl: './dutch-gin.component.html',
    styleUrl: './dutch-gin.component.scss'
})
export class DutchGinComponent {
    appStore = inject(AppStore);
    drinksStore = inject(DrinksStore)
}
