import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppStore } from '../../app-store/app.store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FoodCategoryStore } from '../../features/food/food-store/food-store';
import { SnackbarService } from '../../services/snackbar.service';
import { FirebaseError } from '@angular/fire/app';
import { FoodCategory } from '../../models/drink-category.model copy';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';


interface FormValue {
    orderOfAppearance: number;
    nameNl: string;
    nameEn: string;
    descriptionNl?: string;
    descriptionEn?: string;
}

@Component({
    selector: 'app-add-food-category-dialog',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInput,
        MatDialogModule
    ],
    templateUrl: './add-food-category-dialog.component.html',
    styleUrl: './add-food-category-dialog.component.scss'
})
export class AddFoodCategoryDialogComponent {
    fb = inject(FormBuilder)
    form!: FormGroup;
    // dialogRef = inject<AddFoodCategoryDialogComponent>;
    appStore = inject(AppStore)
    data = inject(MAT_DIALOG_DATA);
    foodCategoryStore = inject(FoodCategoryStore)
    editmode: boolean = false;
    foodCategoryId!: string;
    sb = inject(SnackbarService)

    constructor(
        private dialogRef: MatDialogRef<AddFoodCategoryDialogComponent>
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
            this.foodCategoryId = this.data.category.id;
            this.editmode = true
            this.setFormValue(this.data.category)
        }
    }

    onAddFoodCategory() {
        const formValue: FormValue = this.form.value;
        console.log(formValue)
        if (!this.editmode) {
            const foodCategory: any = {
                nameNl: formValue.nameNl,
                nameEn: formValue.nameEn,
                descriptionNl: formValue.descriptionNl,
                descriptionEn: formValue.descriptionEn,
                orderOfAppearance: formValue.orderOfAppearance,
                consumptions: [],
            }
            this.foodCategoryStore.addFoodCategory(foodCategory)
                .then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: FirebaseError) => {
                    this.sb.openSnackbar(`operation failed due to: ${err.message}`)
                })
        } else {
            this.foodCategoryStore.updateFoodCategoryProperties(
                this.foodCategoryId,
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
    setFormValue(category: FoodCategory) {
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
