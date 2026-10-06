import { AddFoodCategoryDialogComponent } from '../../../admin/add-food-category-dialog/add-food-category-dialog.component';
import { AddFoodDialogComponent } from '../../../admin/add-food-dialog/add-food-dialog.component';
import { AppStore } from '../../../app-store/app.store';
import { AuthStore } from '../../../auth/auth.store';
import { Component, inject, input } from '@angular/core';
import { FoodCategory } from '../../../models/drink-category.model copy';
import { FoodCategoryStore } from '../food-store/food-store';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FoodItemComponent } from './food-item/food-item.component';

@Component({
    selector: 'app-food-category',
    imports: [
        MatButtonModule,
        MatIconModule,
        FoodItemComponent
    ],
    templateUrl: './food-category.component.html',
    styleUrl: './food-category.component.scss'
})
export class FoodCategoryComponent {
    category = input.required<FoodCategory>()
    appStore = inject(AppStore);
    authStore = inject(AuthStore)
    foodCategoryStore = inject(FoodCategoryStore)
    matDialog = inject(MatDialog)
    // data = inject(MAT_DIALOG_DATA, { optional: true });
    editmode: boolean = false;
    id!: string;
    style: Object

    constructor() {
        this.style = {
            'backgroundColor': 'red'
        }
    }

    getStyle(orderOfAppearance: number) {
        // console.log('orderOfAppearance: ', orderOfAppearance)
        const isEven = orderOfAppearance % 2 === 0;
        // console.log('isEven: ', isEven)
        if (isEven) {
            return {
                'backgroundColor': 'var(--p-purple-dark)',
                'color': 'var(--p-black)',
            }
        } else {

            return {
                'backgroundColor': 'var(--p-blue-dark)',
                'color': 'var(--p-black)',
            }
        }
    }


    onAddFood() {
        this.matDialog.open(AddFoodDialogComponent, {
            data: { categoryId: this.category().id }
        })
    }
    editFoodCategory() {
        this.matDialog.open(AddFoodCategoryDialogComponent, {
            data: {
                category: this.category()
            }
        })
    }
}
