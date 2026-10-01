import { Component, inject } from '@angular/core';
import { DrinksStore } from '../drinks/drinks-store/drinks-store';
import { MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppStore } from '../../app-store/app.store';
import { LanguageSelectorComponent } from '../../shared/language-selector/language-selector.component';

@Component({
    selector: 'app-quick-access-dialog',
    imports: [MatDialogTitle, MatDialogModule, MatButtonModule, MatIconModule, LanguageSelectorComponent],
    templateUrl: './quick-access-dialog.component.html',
    styleUrl: './quick-access-dialog.component.scss'
})
export class QuickAccessDialogComponent {
    drinksStore = inject(DrinksStore);
    router = inject(Router);
    appStore = inject(AppStore)

    constructor(private dialogRef: MatDialogRef<QuickAccessDialogComponent>) { }

    onSelectCategory(categoryId: string) {
        console.log(categoryId)
        this.router.navigate(['quick-access-category', categoryId])
        this.dialogRef.close();
    }
}
