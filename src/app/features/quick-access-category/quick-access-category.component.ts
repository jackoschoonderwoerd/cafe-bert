import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, RouterModule } from '@angular/router';
import { DrinksStore } from '../drinks/drinks-store/drinks-store';
import { DrinkCategory } from '../../models/drink-category.model';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuickAccessDialogComponent } from '../quick-access-dialog/quick-access-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from '../home/home.component';
import { AppStore } from '../../app-store/app.store';
import { DrinkCategoryComponent } from '../drinks/drink-category/drink-category.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-quick-access-category',
    imports: [
        JsonPipe,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        CurrencyPipe,
        DrinkCategoryComponent
    ],
    templateUrl: './quick-access-category.component.html',
    styleUrl: './quick-access-category.component.scss'
})
export class QuickAccessCategoryComponent {

    private route = inject(ActivatedRoute)

    drinksStore = inject(DrinksStore)
    appStore = inject(AppStore)
    matDialog = inject(MatDialog)

    constructor() {
        effect(() => {
            const categories = this.categories();
            if (categories) {
                console.log('categories:', categories)
            }
        })
    }

    categoryId = toSignal(
        this.route.paramMap.pipe(
            map(params => params.get('categoryId'))
        ),
        { initialValue: null }
    );

    categories = computed(() => {
        const id = this.categoryId();

        if (!id) {
            return undefined;
        }

        return this.drinksStore.drinkCategories()
            .filter(c => c.id === id);
    });



    onQuickAccess() {
        this.matDialog.open(QuickAccessDialogComponent)
    }

    getStyle(orderOfAppearance: number) {
        console.log(orderOfAppearance);
        return ''
    }
}
