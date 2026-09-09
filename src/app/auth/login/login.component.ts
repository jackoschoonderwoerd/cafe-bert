import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import { AppStore } from '../../app-store/app.store';
import { AuthStore } from '../auth.store';

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
    private authStore = inject(AuthStore);
    private router = inject(Router);

    appStore = inject(AppStore)
    loginForm = this.fb.nonNullable.group({
        email: ['jackoboes@gmail.com', Validators.required],
        password: ['123456', Validators.required]
    });

    async login() {
        try {
            await this.authStore.login(
                this.loginForm.value.email!,
                this.loginForm.value.password!
            );

            await this.router.navigate(['/drinks']);

        } catch (error) {
            console.error(error);
        }
    }

    onSubmit() {
        if (this.loginForm.invalid) return;


        const password = this.loginForm.controls.password.value;

        console.log(password);
        this.appStore.logIn(password)

    }

}
