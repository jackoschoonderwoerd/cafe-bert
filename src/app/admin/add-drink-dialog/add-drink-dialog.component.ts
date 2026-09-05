import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Consumption } from '../../models/consumption.model';
import { DrinkCategoryStore } from '../../features/drinks/drink-category/drink-category-store/drink-category-store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs'
import { JsonPipe } from '@angular/common';

interface FormValue {
    nameNl: string;
    nameEn: string;
    price: number
}

@Component({
    selector: 'app-add-drink-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInput,
        ReactiveFormsModule,
        JsonPipe
    ],

    templateUrl: './add-drink-dialog.component.html',
    styleUrl: './add-drink-dialog.component.scss'
})
export class AddDrinkDialogComponent implements OnInit {
    // data = inject(MAT_DIALOG_DATA);
    form: FormGroup;
    fb = inject(FormBuilder)
    editmode: boolean = false;
    drinkCategoryStore = inject(DrinkCategoryStore)
    categoryId!: string;
    drinkIndex!: number;
    breakpoints = inject(BreakpointObserver);

    sub: Subscription;

    constructor(
        private dialogRef: MatDialogRef<AddDrinkDialogComponent>,
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


        if (this.data.drink) {
            this.editmode = true;
            this.categoryId = this.data.categoryId;
            this.drinkIndex = this.data.drinkIndex
            const drink: Consumption = this.data.drink
            // this.form.setValue({
            //     ...drink
            // })
            this.form.patchValue({
                nameNl: drink.nameNl ? drink.nameNl : '',
                nameEn: drink.nameEn ? drink.nameEn : '',
                descriptionNl: drink.descriptionNl ? drink.descriptionNl : '',
                descriptionEn: drink.descriptionEn ? drink.descriptionEn : '',
                price: drink.price ? drink.price : '',
                priceBottle: drink.priceBottle ? drink.priceBottle : '',
                priceKleintje: drink.priceKleintje ? drink.priceKleintje : '',
                priceFluitje: drink.priceFluitje ? drink.priceFluitje : '',
                priceVaasje: drink.priceVaasje ? drink.priceVaasje : '',
                priceCl40: drink.priceCl40 ? drink.priceCl40 : '',
            })
        } else {
            this.categoryId = this.data.categoryId
        }
    }

    onAddDrink() {
        const formValue: FormValue = this.form.value;
        const drink: Consumption = { ...formValue }
        if (!this.editmode) {
            this.drinkCategoryStore.addDrinkToCategory(this.categoryId, drink)
                ?.then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: any) => {
                    console.log(err);
                })


        } else {
            this.drinkCategoryStore.updateDrink(this.categoryId, this.drinkIndex, drink)
                ?.then((res: any) => {
                    this.dialogRef.close()
                })
                .catch((err: any) => {
                    console.log(err);
                })
        }

    }
}
