import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FoodCategoryStore } from '../../features/food/food-store/food-store';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Consumption } from '../../models/consumption.model';

interface FormValue {
    nameNl: string;
    nameEn: string;
    price: number
}

@Component({
    selector: 'app-add-food-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInput,
        ReactiveFormsModule,
    ],
    templateUrl: './add-food-dialog.component.html',
    styleUrl: './add-food-dialog.component.scss'
})
export class AddFoodDialogComponent {
    form: FormGroup;
    fb = inject(FormBuilder)
    editmode: boolean = false;
    foodCategoryStore = inject(FoodCategoryStore)
    categoryId!: string;
    foodIndex!: number;
    breakpoints = inject(BreakpointObserver);

    sub: Subscription;

    constructor(
        private dialogRef: MatDialogRef<AddFoodDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            nameNl: new FormControl(null, [Validators.required]),
            nameEn: new FormControl(null, [Validators.required]),
            descriptionNl: new FormControl(null),
            descriptionEn: new FormControl(null),
            price: new FormControl(null),
            priceBottle: new FormControl(null),
            priceKleintje: new FormControl(null),
            priceFluitje: new FormControl(null),
            priceVaasje: new FormControl(null),
            priceCl40: new FormControl(null)
        })
        console.log(data)
    }

    ngOnInit(): void {
        console.log(this.data)

        if (this.data.foodItem) {
            this.editmode = true;
            this.categoryId = this.data.categoryId;
            this.foodIndex = this.data.foodIndex
            const food: Consumption = this.data.foodItem

            this.form.patchValue({
                nameNl: food.nameNl ? food.nameNl : '',
                nameEn: food.nameEn ? food.nameEn : '',
                descriptionNl: food.descriptionNl ? food.descriptionNl : '',
                descriptionEn: food.descriptionEn ? food.descriptionEn : '',
                price: food.price ? food.price : '',
                priceBottle: food.priceBottle ? food.priceBottle : '',
                priceKleintje: food.priceKleintje ? food.priceKleintje : '',
                priceFluitje: food.priceFluitje ? food.priceFluitje : '',
                priceVaasje: food.priceVaasje ? food.priceVaasje : '',
                priceCl40: food.priceCl40 ? food.priceCl40 : '',
            })
        } else {
            this.categoryId = this.data.categoryId
        }
    }

    onAddFood() {
        const formValue: FormValue = this.form.value;
        const food: Consumption = { ...formValue }
        if (!this.editmode) {
            this.foodCategoryStore.addFoodToCategory(this.categoryId, food)
                ?.then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: any) => {
                    console.log(err);
                })


        } else {
            this.foodCategoryStore.updateFood(this.categoryId, this.foodIndex, food)
                ?.then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: any) => {
                    console.log(err);
                })
        }

    }
}
