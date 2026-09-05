import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { AppStore } from '../../../app-store/app.store';
import { Consumption } from '../../../models/consumption.model';

@Component({
    selector: 'app-menu-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './menu-form.component.html',
    styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent {

    editmode: boolean = false
    public form!: FormGroup;
    fb = inject(FormBuilder);
    appStore = inject(AppStore);
    data = inject(MAT_DIALOG_DATA, { optional: true });



    constructor(public dialogRef: MatDialogRef<MenuFormComponent>) {
        console.log(this.data)
        this.form = this.fb.group({
            nameNl: new FormControl('', [Validators.required]),
            nameEn: new FormControl(''),
            price: new FormControl(null, [Validators.required])

        })
        if (this.data.consumption) {
            this.editmode = true
            this.form.patchValue({ ...this.data.consumption })
        }
    }

    onSubmitForm() {
        console.log(this.form.value)
        const consumption: Consumption = this.form.value;
        if (!this.editmode) {
            this.appStore.addConsumptionToArray('hotDrinks', consumption);
        } else {
            this.appStore.updateHotDrink(this.data.category, this.data.index, consumption)
        }
        this.dialogRef.close()
    }
    onCancel() {
        this.dialogRef.close()
    }
}
