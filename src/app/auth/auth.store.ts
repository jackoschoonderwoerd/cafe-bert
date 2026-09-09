import { Injectable, inject, signal, computed } from '@angular/core';
import {
    Auth,
    User,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    private auth = inject(Auth);
    private router = inject(Router);
    private snackbar = inject(MatSnackBar);

    private _user = signal<User | null>(null);
    private _loading = signal(true);

    readonly user = this._user.asReadonly();
    readonly loading = this._loading.asReadonly();

    readonly isLoggedIn = computed(() => this._user() !== null);

    constructor() {

        onAuthStateChanged(this.auth, user => {
            this._user.set(user);
            this._loading.set(false);
            this.snackbar.open('Login persisted', 'OK', { duration: 0 });
        });
    }

    async login(email: string, password: string): Promise<void> {

        const credential = await signInWithEmailAndPassword(
            this.auth,
            email,
            password
        );

        this._user.set(credential.user);

        this.snackbar.open('You are logged in', 'OK', { duration: 0 })
    }

    async logout(): Promise<void> {

        await signOut(this.auth);

        // update Angular signal immediately
        this._user.set(null);

        await this.router.navigateByUrl('/drinks');

        this.snackbar.open(
            'You are logged out',
            'OK',
            { duration: 0 }
        );
    }
}

// import { Injectable, inject, signal, computed } from '@angular/core';
// import {
//     Auth,
//     User,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged
// } from '@angular/fire/auth';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthStore {

//     private auth = inject(Auth);
//     private router = inject(Router)

//     private _user = signal<User | null>(null);
//     private _loading = signal(true);
//     private snackbar = inject(MatSnackBar)

//     readonly user = this._user.asReadonly();
//     readonly loading = this._loading.asReadonly();

//     readonly isLoggedIn = computed(() => !!this._user());


//     constructor() {
//         onAuthStateChanged(this.auth, user => {
//             this._user.set(user);
//             this._loading.set(false);
//         });
//     }

//     async login(email: string, password: string): Promise<void> {
//         await signInWithEmailAndPassword(
//             this.auth,
//             email,
//             password
//         ).then((res: any) => {
//             console.log(res)
//         });
//     }

//     async logout(): Promise<void> {
//         await signOut(this.auth).then(() => {
//             this.router.navigateByUrl('/login');
//             this.snackbar.open('You are logged out', 'OK', { duration: 0 });

//         });
//     }
// }
