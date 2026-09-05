import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, effect, inject, Signal } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { initialDrinkCategorySlice } from './drink-category-slice';
import { FirestoreService } from '../../../../services/firestore.service';
import { ConfirmService } from '../../../../services/confirm.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { DrinkCategory } from '../../../../models/drink-category.model';
import { Consumption } from '../../../../models/consumption.model';
import { firstValueFrom } from 'rxjs';
import { moveDown, moveUp } from '../../../../helper-functions/arrays';




export const DrinkCategoryStore = signalStore(
    { providedIn: 'root' },
    withState(initialDrinkCategorySlice),
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
            addDrinkCategory(drinkCategory: DrinkCategory) {
                const newDrinkCategories: DrinkCategory[] = store.drinkCategories()
                newDrinkCategories.push(drinkCategory)
                patchState(store, { drinkCategories: newDrinkCategories })

                const path = `cafe-bert/drinks/categories`

                return fs.addDoc(path, drinkCategory)
                    .then((res: any) => {
                        sb.openSnackbar(`drink category added`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(err);
                        sb.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            },
            async deleteDrinkCategory(categoryId: string) {
                const status = await firstValueFrom(cs.getConfirmation('this will permanently delete the category and all the drinks it contains'))

                if (!status) {
                    sb.openSnackbar('operation aborted by user');
                } else {

                    const oldCategories = store.drinkCategories();
                    console.log(oldCategories)
                    const categoryIndex = oldCategories.findIndex(c => c.id === categoryId);

                    if (categoryIndex === -1) {
                        sb.openSnackbar('no drink category found');
                        return;
                    }
                    const newDrinkCategories = oldCategories.filter(c => c.id !== categoryId)
                    // const newDrinkCategories = oldCategories.splice(categoryIndex, 1)


                    // console.log(newDrinkCategories)
                    patchState(store, { drinkCategories: newDrinkCategories })

                    const path = `cafe-bert/drinks/categories/${categoryId}`

                    try {
                        await fs.deleteDoc(path);
                        sb.openSnackbar('category removed')
                    } catch (err) {
                        console.log(err)
                        sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                    }
                }
            },

            async getSortedDrinkCategories(): Promise<void> {
                const path = `cafe-bert/drinks/categories`;

                try {

                    fs.sortedCollection(path, 'orderOfAppearance', 'asc')
                        .subscribe((drinkCategories: DrinkCategory[]) => {

                            patchState(store, { drinkCategories });
                        })

                } catch (err) {
                    console.error(err);
                    sb.openSnackbar('Failed to load drink categories');
                }

                // try {
                //     const drinkCategories = await firstValueFrom(
                //          fs.sortedCollection(path, 'orderOfAppearance', 'desc')
                //     );
                //     patchState(store, { drinkCategories });
                // } catch (err) {
                //     console.error(err);
                //     sb.openSnackbar('Failed to load drink categories');
                // }
            },

            async getDrinkCategories(): Promise<void> {
                const path = `cafe-bert/drinks/categories`;

                try {
                    const drinkCategories = await firstValueFrom(
                        fs.collection(path)
                    );

                    patchState(store, { drinkCategories });
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar('Failed to load drink categories');
                }
            },
            getEnDrinkCategoryNameById(id: string): string {
                // const categories: DrinkCategory[] = store.drinkCategories()
                // categories.forEach(c => console.log(c.nameEn))
                const nameEn = store.drinkCategories().filter(c => c.id === id)[0].nameEn;
                // console.log(nameEn)
                // console.log(nameEn)
                return nameEn
            },
            async updateDrinkCategoryProperties(
                categoryId: string,
                orderOfAppearance: number,
                nameNl: string,
                nameEn: string,
                descriptionNl: string,
                descriptionEn: string
            ) {
                // Immutable update for signals
                patchState(store, {
                    drinkCategories: store.drinkCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, orderOfAppearance, nameNl, nameEn, descriptionNl, descriptionEn }
                            : c
                    )
                });

                const path = `cafe-bert/drinks/categories/${categoryId}`;

                try {
                    await fs.updateFields(path, {
                        nameNl,
                        nameEn,
                        descriptionNl,
                        descriptionEn,
                        orderOfAppearance
                    });

                    sb.openSnackbar('Category updated');
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`Update failed: ${(err as FirebaseError).message}`);
                }
            },




            async addDrinkToCategory(categoryId: string, drink: Consumption): Promise<void> {
                const categories = store.drinkCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                if (categoryIndex === -1) {
                    sb.openSnackbar('no drink category found');
                    return Promise.resolve()
                }

                // Clone state immutably
                const updatedCategories = structuredClone(categories);
                const category = updatedCategories[categoryIndex];

                // Add drink
                category.consumptions.push(drink);

                // Update local store
                patchState(store, { drinkCategories: updatedCategories });

                // Firestore update
                const path = `cafe-bert/drinks/categories/${categoryId}`;

                try {
                    await fs.addElementToArray(path, 'consumptions', drink);
                    sb.openSnackbar('drink added')
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`);
                }

            },

            async removeDrinkFromCategory(categoryId: string, drinkIndex: number): Promise<void> {
                const categories = store.drinkCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                // Category not found
                if (categoryIndex === -1) {
                    sb.openSnackbar('no drink category found');
                    return; // <-- now clearly a Promise<void> because of async
                }

                // Clone immutable state
                const updatedCategories = structuredClone(categories);
                const category = updatedCategories[categoryIndex];

                // Remove drink
                category.consumptions.splice(drinkIndex, 1);

                // Update local store
                patchState(store, { drinkCategories: updatedCategories });

                // Firestore update
                const path = `cafe-bert/drinks/categories/${categoryId}`;

                try {
                    await fs.updateField(path, 'consumptions', category.consumptions);
                    sb.openSnackbar('drink removed');
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`);
                }
            },


            async updateDrink(categoryId: string, drinkIndex: number, drink: Consumption): Promise<void> {
                const categories = store.drinkCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                if (categoryIndex === -1) {
                    sb.openSnackbar('no drink category found');
                    return Promise.resolve();
                }

                // Clone immutable
                const updatedCategories = structuredClone(categories);
                const updatedCategory = updatedCategories[categoryIndex];

                // Update item
                updatedCategory.consumptions[drinkIndex] = drink;

                // Update signal store (local state)
                patchState(store, { drinkCategories: updatedCategories });

                // Update Firestore (remote state)
                const path = `cafe-bert/drinks/categories/${categoryId}`;

                try {
                    await fs.updateField(path, 'consumptions', updatedCategory.consumptions)
                    sb.openSnackbar('drink updated')
                } catch (err) {
                    console.error(err)
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                }
            },
            async moveUp(categoryId: string, consumption: Consumption) {
                const oldConsumptions: Consumption[] = store.drinkCategories().filter((c => c.id === categoryId))[0].consumptions;
                const index = oldConsumptions.findIndex(c => c === consumption)

                if (index <= 0) return;
                const newConsumptions: Consumption[] = moveUp(oldConsumptions, index);
                patchState(store, {
                    drinkCategories: store.drinkCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, consumptions: newConsumptions }
                            : c
                    )
                });
                const path = `cafe-bert/drinks/categories/${categoryId}`
                try {
                    await fs.updateField(path, 'consumptions', newConsumptions);
                    sb.openSnackbar(`consumptions array updated`)
                } catch (err) {
                    console.log(err)
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                }
            },

            async moveDown(categoryId: string, consumption: Consumption) {
                const oldConsumptions: Consumption[] = store.drinkCategories().filter((c => c.id === categoryId))[0].consumptions;
                const index = oldConsumptions.findIndex(c => c === consumption);
                if (index < 0 || index >= oldConsumptions.length - 1) return;
                const newConsumptions: Consumption[] = moveDown(oldConsumptions, index)
                patchState(store, {
                    drinkCategories: store.drinkCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, consumptions: newConsumptions }
                            : c
                    )
                });
                const path = `cafe-bert/drinks/categories/${categoryId}`
                try {
                    await fs.updateField(path, 'consumptions', newConsumptions);
                    sb.openSnackbar('consumptions array updated')
                } catch (err) {
                    console.log(err)
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                }

            }
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
