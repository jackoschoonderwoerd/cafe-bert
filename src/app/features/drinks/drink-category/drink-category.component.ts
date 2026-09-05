import { Component, inject, input, OnInit } from '@angular/core';
import { DrinkCategory } from '../../../models/drink-category.model';
import { JsonPipe } from '@angular/common';
import { AppStore } from '../../../app-store/app.store';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddDrinkCategoryDialogComponent } from '../../../admin/add-drink-category-dialog/add-drink-category-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DrinkCategoryStore } from './drink-category-store/drink-category-store';
import { AddDrinkDialogComponent } from '../../../admin/add-drink-dialog/add-drink-dialog.component';
import { DrinkComponent } from './drink/drink.component';
import { DraftBeerHeaderComponent } from './draft-beer-header/draft-beer-header.component';
import { WineBottleHeaderComponent } from './wine-bottle-header/wine-bottle-header.component';

@Component({
    selector: 'app-drink-category',
    imports: [
        JsonPipe,
        MatButtonModule,
        MatIconModule,
        DrinkComponent,
        DraftBeerHeaderComponent,
        WineBottleHeaderComponent
    ],
    templateUrl: './drink-category.component.html',
    styleUrl: './drink-category.component.scss'
})
export class DrinkCategoryComponent {
    category = input.required<DrinkCategory>()
    appStore = inject(AppStore);
    drinkCateegoryStore = inject(DrinkCategoryStore)
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

    getStyle(categoryNameEn: string) {
        // console.log(categoryNameEn)
        switch (categoryNameEn) {
            case 'draft beers':
            case 'bottled':
            case 'draft beers 40cl':
            case '0.0%':
                return {
                    'backgroundColor': 'var(--p-purple)',
                    'color': 'var(--p-balck)',
                    'font-weight': 'bold'
                }
            case 'white wine':
            case 'red wine':
            case 'sparkling':
            case 'arend jan de wijnman':
                return {
                    'backgroundColor': 'var(--p-blue)',
                    'color': 'var(--p-black)',
                    'font-weight': 'bold'
                }
            default:
                return {
                    'backgroundColor': 'var(--p-brown)',
                    'color': 'var(--p-yellow)',
                    'font-weight': 'bold'
                }
        }
    }

    onAddDrink() {
        this.matDialog.open(AddDrinkDialogComponent, {
            data: { categoryId: this.category().id }
        })
    }
    editDrinkCategory() {
        this.matDialog.open(AddDrinkCategoryDialogComponent, {
            data: {
                category: this.category()
            }
        })
    }
}
