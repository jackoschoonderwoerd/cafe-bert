import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DrinkCategoryComponent } from './drink-category/drink-category.component';
import { AddDrinkCategoryDialogComponent } from '../../admin/add-drink-category-dialog/add-drink-category-dialog.component';
import { AppStore } from '../../app-store/app.store';

import { AuthStore } from '../../auth/auth.store';
import { DrinksStore } from './drinks-store/drinks-store';

@Component({
    selector: 'app-drinks',
    imports: [MatIconModule,
        MatButtonModule,

        DrinkCategoryComponent,

    ],
    templateUrl: './drinks.component.html',
    styleUrl: './drinks.component.scss'
})
export class DrinksComponent {

    matDialog = inject(MatDialog);
    appStore = inject(AppStore)
    drinkCategoryStore = inject(DrinksStore);
    authStore = inject(AuthStore)


    onAddDrinkCategory() {
        this.matDialog.open(AddDrinkCategoryDialogComponent);
    }
}
