import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, effect, inject, Signal } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

import { firstValueFrom } from 'rxjs';
import { initialNavigationSlice } from './navigation-slice';
import { FirestoreService } from '../../services/firestore.service';
import { ConfirmService } from '../../services/confirm.service';
import { SnackbarService } from '../../services/snackbar.service';




export const NavigationStore = signalStore(
    { providedIn: 'root' },
    withState(initialNavigationSlice),
    withComputed(store => ({
        // productListVm: computed(() => buildProductListVm(
        //     store.products(),
        //     store.searchWord(),
        //     store.cartQuantities())
        // ),

        // cartVm: computed(() => buildCartVm(
        //     store.products(),
        //     store.cartQuantities(),
        //     store.taxRate(),
        //     store.cartVisible())
        // )
    })),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const cs = inject(ConfirmService);
        const sb = inject(SnackbarService);
        const router = inject(Router)

        return {
            addDrinkCategory(drinkCategory: any) {

            },
        }
    }),
    withHooks(store => ({
        onInit: () => {
            // const persisted: Signal<PersistedAppStoreSlice> = computed(() => ({
            //     cartQuantities: store.cartQuantities()
            // }))
            // const persistedText = localStorage.getItem('shop')
            // if (persistedText) {
            //     const persistedData = JSON.parse(persistedText) as AppStoreSlice;
            //     patchState(store, persistedData)
            // }

            // effect(() => {
            //     const persistedValue = persisted();
            //     localStorage.setItem('shop', JSON.stringify(persistedValue))
            // })
        }
    })),
)
