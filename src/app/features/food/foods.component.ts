import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStore } from '../../app-store/app.store';
import { FoodCategoryStore } from './food-store/food-store';
import { AuthStore } from '../../auth/auth.store';
import { AddFoodCategoryDialogComponent } from '../../admin/add-food-category-dialog/add-food-category-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FoodCategoryComponent } from './food-category/food-category.component';

@Component({
    selector: 'app-food',
    imports: [MatButtonModule,

        FoodCategoryComponent],
    templateUrl: './foods.component.html',
    styleUrl: './foods.component.scss'
})
export class FoodsComponent {
    matDialog = inject(MatDialog);
    appStore = inject(AppStore)
    foodCategoryStore = inject(FoodCategoryStore);
    authStore = inject(AuthStore)


    onAddFoodCategory() {
        this.matDialog.open(AddFoodCategoryDialogComponent);
    }
}
