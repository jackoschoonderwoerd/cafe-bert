import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from "@angular/router";
import { AppStore } from '../../app-store/app.store';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        MatButtonModule,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})


export class LoginComponent {
    private fb = inject(FormBuilder);
    appStore = inject(AppStore)
    loginForm = this.fb.nonNullable.group({
        password: ['parisius', Validators.required]
    });


    onSubmit() {
        if (this.loginForm.invalid) return;


        const password = this.loginForm.controls.password.value;

        console.log(password);
        this.appStore.logIn(password)
        // Do your authentication here
    }

}
