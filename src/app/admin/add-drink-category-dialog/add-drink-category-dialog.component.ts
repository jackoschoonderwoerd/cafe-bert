import { Component, inject, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DrinkCategory } from '../../models/drink-category.model';
import { AppStore } from '../../app-store/app.store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DrinkCategoryStore } from '../../features/drinks/drink-category/drink-category-store/drink-category-store';
import { FirebaseError } from '@angular/fire/app';
import { SnackbarService } from '../../services/snackbar.service';

interface FormValue {
    orderOfAppearance: number;
    nameNl: string;
    nameEn: string;
    descriptionNl?: string;
    descriptionEn?: string;
}

@Component({
    selector: 'app-add-drink-category-dialog',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInput, MatDialogModule],
    templateUrl: './add-drink-category-dialog.component.html',
    styleUrl: './add-drink-category-dialog.component.scss'
})
export class AddDrinkCategoryDialogComponent implements OnInit {
    fb = inject(FormBuilder)
    form!: FormGroup;
    // dialogRef = inject<AddDrinkCategoryDialogComponent>;
    appStore = inject(AppStore)
    data = inject(MAT_DIALOG_DATA);
    drinkCategoryStore = inject(DrinkCategoryStore)
    editmode: boolean = false;
    drinkCategoryId!: string;
    sb = inject(SnackbarService)

    constructor(
        private dialogRef: MatDialogRef<AddDrinkCategoryDialogComponent>
    ) {
        this.form = this.fb.group({
            orderOfAppearance: new FormControl(0, [Validators.required]),
            nameNl: new FormControl(null, [Validators.required]),
            nameEn: new FormControl(null, [Validators.required]),
            descriptionNl: new FormControl(null),
            descriptionEn: new FormControl(null)
        })

    }

    ngOnInit(): void {
        console.log(this.data)
        if (this.data && this.data.category) {
            this.drinkCategoryId = this.data.category.id;
            this.editmode = true
            this.setFormValue(this.data.category)
        }
    }

    onAddDrinkCategory() {
        const formValue: FormValue = this.form.value;
        console.log(formValue)
        if (!this.editmode) {
            const drinkCategory: any = {
                nameNl: formValue.nameNl,
                nameEn: formValue.nameEn,
                descriptionNl: formValue.descriptionNl,
                descriptionEn: formValue.descriptionEn,
                orderOfAppearance: formValue.orderOfAppearance,
                consumptions: [],
            }
            this.drinkCategoryStore.addDrinkCategory(drinkCategory)
                .then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: FirebaseError) => {
                    this.sb.openSnackbar(`operation failed due to: ${err.message}`)
                })
        } else {
            this.drinkCategoryStore.updateDrinkCategoryProperties(
                this.drinkCategoryId,
                formValue.orderOfAppearance,
                formValue.nameNl,
                formValue.nameEn,
                formValue.descriptionNl,
                formValue.descriptionEn)
                .then((res: any) => {
                    this.dialogRef.close()
                })
        }
    }
    setFormValue(category: DrinkCategory) {
        console.log(category);
        this.form.setValue({
            orderOfAppearance: category.orderOfAppearance ? category.orderOfAppearance : 0,
            nameNl: category.nameNl,
            nameEn: category.nameEn ? category.nameEn : '',
            descriptionNl: category.descriptionNl ? category.descriptionNl : '',
            descriptionEn: category.descriptionEn ? category.descriptionEn : ''


        })
    }
}
