import { Component, inject, input } from '@angular/core';
import { Consumption } from '../../../../models/consumption.model';
import { ConfirmService } from '../../../../services/confirm.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AppStore } from '../../../../app-store/app.store';
import { AuthStore } from '../../../../auth/auth.store';
import { FoodCategoryStore } from '../../food-store/food-store';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../../../../admin/add-food-dialog/add-food-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-food-item',
    imports: [
        CurrencyPipe,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './food-item.component.html',
    styleUrl: './food-item.component.scss'
})
export class FoodItemComponent {
    foodItem = input.required<Consumption>()
    last = input.required<boolean>()
    first = input.required<boolean>()
    index = input.required<number>()
    categoryId = input.required<string>()
    cf = inject(ConfirmService);
    sb = inject(SnackbarService)

    appStore = inject(AppStore);
    authStore = inject(AuthStore)
    foodCategoryStore = inject(FoodCategoryStore)
    matDialog = inject(MatDialog)

    onEdit() {
        this.matDialog.open(AddFoodDialogComponent, {
            data: {
                foodItem: this.foodItem(),
                foodIndex: this.index(),
                categoryId: this.categoryId()
            }
        })
    }


    onDelete() {
        this.cf.getConfirmation().subscribe((status: boolean) => {
            if (status) {
                this.foodCategoryStore.removeFoodFromCategory(
                    this.categoryId(), this.index()
                )
            } else {
                this.sb.openSnackbar(`operation aborted by user`)
            }
        })
    }
    onHide(hide: boolean) {
        this.foodCategoryStore.hideFood(this.categoryId(), this.index(), hide)

    }
    onMoveUp() {
        this.foodCategoryStore.moveUp(this.categoryId(), this.foodItem())
    }
    onMoveDown() {
        this.foodCategoryStore.moveDown(this.categoryId(), this.foodItem())
    }
}
