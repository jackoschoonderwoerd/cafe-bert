import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, effect, inject, Signal } from '@angular/core'
import { AppStoreSlice, initialAppStoreSlice, PersistedAppStoreSlice } from './app-store.slice'
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '../services/confirm.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { Consumption } from '../models/consumption.model';
import { FirebaseError } from '@angular/fire/app';
import { DrinkCategory } from '../models/drink-category.model';



export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialAppStoreSlice),
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

            getDrinks() {
                // fs.getDoc('cafe-bert/drinks').subscribe((drinks: any) => {
                //     // console.log(Object.values(drinks))
                //     console.log(drinks.hot_drinks)


                //     // return
                //     sb.openSnackbar('drinks loaded from db')

                //     patchState(store, {
                //         hot_drinks: drinks.hot_drinks,
                //         soda: drinks.soda,
                //         drinkCategories: drinks
                //     })
                // })
            },

            addConsumptionToArray(category: string, consumption: Consumption) {
                // console.log(category)
                // const newHotDrinks = store.drinkCategories()
                // newHotDrinks.push(consumption)
                // patchState(store, { hotDrinks: newHotDrinks, hotdrinksChanged: true })

            },
            updateHotdrinks() {
                console.log('updating')
                // fs.setDoc('cafe-bert/drinkCategories', { hot_drinks: store.drinkCategories() })
                //     .then((res: any) => {
                //         console.log(res)
                //         patchState(store, { hotdrinksChanged: false })
                //     })
                //     .catch((err: FirebaseError) => {
                //         console.log(err);
                //         sb.openSnackbar(`operation failed due to ${err.message}`)
                //     })
            },

            deleteHotDrink(index: number) {
                // cs.getConfirmation().subscribe((status: boolean) => {
                //     if (status) {
                //         const newHotDrinks = store.hotDrinks()
                //         newHotDrinks.splice(index, 1)
                //         patchState(store, { hotDrinks: newHotDrinks, hotdrinksChanged: true })

                //     } else {
                //         sb.openSnackbar('operation aborted by usen');
                //     }
                // })
            },

            moveHotDrinkUp(index: number) {
                // const drinkGategories:DrinkCategory[] = store.drinkCategories()
                // const hot_drinks = drinkGategories.h
                // if (index <= 0 || index >= newHotDrinks.length) return // no move possible


                // [newHotDrinks[index - 1], newHotDrinks[index]] = [newHotDrinks[index], newHotDrinks[index - 1]];
                // patchState(store, { hotDrinks: newHotDrinks, hotdrinksChanged: true })
            },
            moveHotDrinkDown(index: number) {
                // const newHotDrinks = store.hotDrinks();
                // if (index < 0 || index >= newHotDrinks.length - 1) return  // can't move down


                // [newHotDrinks[index], newHotDrinks[index + 1]] = [newHotDrinks[index + 1], newHotDrinks[index]];
                // patchState(store, { hotDrinks: newHotDrinks, hotdrinksChanged: true })
            },

            updateHotDrink(category: string, index: number, consumption: Consumption) {
                // console.log
                // const newHotDrinks = store.hotDrinks();
                // newHotDrinks[index] = consumption;
                // patchState(store, { hotDrinks: newHotDrinks, hotdrinksChanged: true })
            },

            setActiveLanguage(language: 'nl' | 'en') {
                patchState(store, { activeLanguage: language })
            },
            logIn(password: string) {
                if (password === 'parisius') {

                    patchState(store, { isLoggedIn: true })
                    router.navigateByUrl('drinks')
                }
            },
            logOut() {
                patchState(store, { isLoggedIn: false })
            }

        };
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
