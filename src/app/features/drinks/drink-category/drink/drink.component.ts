import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Consumption } from '../../../../models/consumption.model';
import { AppStore } from '../../../../app-store/app.store';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MenuFormComponent } from '../../../../admin/shared/menu-form/menu-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DrinkCategoryStore } from '../drink-category-store/drink-category-store';
import { ConfirmService } from '../../../../services/confirm.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AddDrinkDialogComponent } from '../../../../admin/add-drink-dialog/add-drink-dialog.component';

@Component({
    selector: 'app-drink',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatIconModule,
        MatButtonModule,
        JsonPipe
    ],
    templateUrl: './drink.component.html',
    styleUrl: './drink.component.scss'
})
export class DrinkComponent {

    drink = input.required<Consumption>()
    last = input.required<boolean>()
    first = input.required<boolean>()
    index = input.required<number>()
    categoryId = input.required<string>()
    cf = inject(ConfirmService);
    sb = inject(SnackbarService)

    appStore = inject(AppStore);
    drinkCategoriesStore = inject(DrinkCategoryStore)
    matDialog = inject(MatDialog)

    onEdit() {
        this.matDialog.open(AddDrinkDialogComponent, {
            data: {
                drink: this.drink(),
                drinkIndex: this.index(),
                categoryId: this.categoryId()
            }
        })
    }


    onDelete() {
        this.cf.getConfirmation().subscribe((status: boolean) => {
            if (status) {
                this.drinkCategoriesStore.removeDrinkFromCategory(
                    this.categoryId(), this.index()
                )
            } else {
                this.sb.openSnackbar(`operation aborted by user`)
            }
        })
    }
    onMoveUp() {
        this.drinkCategoriesStore.moveUp(this.categoryId(), this.drink())
    }
    onMoveDown() {
        this.drinkCategoriesStore.moveDown(this.categoryId(), this.drink())
    }
}
