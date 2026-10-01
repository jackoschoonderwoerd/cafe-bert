import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, effect, inject, Signal } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

import { FirestoreService } from '../../../services/firestore.service';
import { ConfirmService } from '../../../services/confirm.service';
import { SnackbarService } from '../../../services/snackbar.service';

import { Consumption } from '../../../models/consumption.model';
import { firstValueFrom } from 'rxjs';
import { moveDown, moveUp } from '../../../helper-functions/arrays';
import { initialFoodCategorySlice } from './food-slice';
import { FoodCategory } from '../../../models/drink-category.model copy';





export const FoodCategoryStore = signalStore(
    { providedIn: 'root' },
    withState(initialFoodCategorySlice),
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
            addFoodCategory(foodCategory: FoodCategory) {
                const newFoodCategories: FoodCategory[] = store.foodCategories()
                newFoodCategories.push(foodCategory)
                patchState(store, { foodCategories: newFoodCategories })

                const path = `cafe-bert/food/categories`

                return fs.addDoc(path, foodCategory)
                    .then((res: any) => {
                        sb.openSnackbar(`food category added`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(err);
                        sb.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            },
            async deleteFoodCategory(categoryId: string) {
                const status = await firstValueFrom(cs.getConfirmation('this will permanently delete the category and all the food it contains'))

                if (!status) {
                    sb.openSnackbar('operation aborted by user');
                } else {

                    const oldCategories = store.foodCategories();
                    console.log(oldCategories)
                    const categoryIndex = oldCategories.findIndex(c => c.id === categoryId);

                    if (categoryIndex === -1) {
                        sb.openSnackbar('no food category found');
                        return;
                    }
                    const newFoodCategories = oldCategories.filter(c => c.id !== categoryId)
                    // const newFoodCategories = oldCategories.splice(categoryIndex, 1)


                    // console.log(newFoodCategories)
                    patchState(store, { foodCategories: newFoodCategories })

                    const path = `cafe-bert/food/categories/${categoryId}`

                    try {
                        await fs.deleteDoc(path);
                        sb.openSnackbar('food category removed')
                    } catch (err) {
                        console.log(err)
                        sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                    }
                }
            },

            async getSortedFoodCategories(): Promise<void> {
                const path = `cafe-bert/food/categories`;

                try {

                    fs.sortedCollection(path, 'orderOfAppearance', 'asc')
                        .subscribe((foodCategories: FoodCategory[]) => {

                            patchState(store, { foodCategories });
                            console.log(foodCategories);
                        })

                } catch (err) {
                    console.error(err);
                    sb.openSnackbar('Failed to load food categories');
                }

                // try {
                //     const foodCategories = await firstValueFrom(
                //          fs.sortedCollection(path, 'orderOfAppearance', 'desc')
                //     );
                //     patchState(store, { foodCategories });
                // } catch (err) {
                //     console.error(err);
                //     sb.openSnackbar('Failed to load food categories');
                // }
            },

            async getFoodCategories(): Promise<void> {
                const path = `cafe-bert/food/categories`;

                try {
                    const foodCategories = await firstValueFrom(
                        fs.collection(path)
                    );

                    patchState(store, { foodCategories });
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar('Failed to load food categories');
                }
            },
            getEnFoodCategoryNameById(id: string): string {
                // const categories: FoodCategory[] = store.foodCategories()
                // categories.forEach(c => console.log(c.nameEn))
                const nameEn = store.foodCategories().filter(c => c.id === id)[0].nameEn;
                // console.log(nameEn)
                // console.log(nameEn)
                return nameEn
            },

            async updateFoodCategoryProperties(
                categoryId: string,
                orderOfAppearance: number,
                nameNl: string,
                nameEn: string,
                descriptionNl: string,
                descriptionEn: string
            ) {
                // Immutable update for signals
                patchState(store, {
                    foodCategories: store.foodCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, orderOfAppearance, nameNl, nameEn, descriptionNl, descriptionEn }
                            : c
                    )
                });

                const path = `cafe-bert/food/categories/${categoryId}`;

                try {
                    await fs.updateFields(path, {
                        nameNl,
                        nameEn,
                        descriptionNl,
                        descriptionEn,
                        orderOfAppearance
                    });

                    sb.openSnackbar('Food category updated');
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`Update failed: ${(err as FirebaseError).message}`);
                }
            },




            async addFoodToCategory(categoryId: string, food: Consumption): Promise<void> {
                const categories = store.foodCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                if (categoryIndex === -1) {
                    sb.openSnackbar('no food category found');
                    return Promise.resolve()
                }

                // Clone state immutably
                const updatedCategories = structuredClone(categories);
                const category = updatedCategories[categoryIndex];

                // Add food
                category.consumptions.push(food);

                // Update local store
                patchState(store, { foodCategories: updatedCategories });

                // Firestore update
                const path = `cafe-bert/food/categories/${categoryId}`;

                try {
                    await fs.addElementToArray(path, 'consumptions', food);
                    sb.openSnackbar('food added')
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`);
                }

            },
            async hideFood(categoryId: string, consumptionIndex: number, hide: boolean) {
                console.log(categoryId, consumptionIndex, hide);
                const categories = store.foodCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);
                const updatedCategories = structuredClone(categories);
                const category = updatedCategories[categoryIndex]
                if (categoryIndex === -1) {
                    sb.openSnackbar('no food category found');
                    return; // <-- now clearly a Promise<void> because of async
                }
                if (hide) {
                    category.consumptions[consumptionIndex].hidden = true
                    console.log(category.consumptions[consumptionIndex].hidden)
                    // patchState(store, { foodCategories: updatedCategories });
                } else if (!hide) {
                    // const updatedCategories = structuredClone(categories);
                    // const category = updatedCategories[categoryIndex]
                    category.consumptions[consumptionIndex].hidden = false
                    // console.log(category.consumptions[consumptionIndex].hidden)
                }
                patchState(store, { foodCategories: updatedCategories });

                const path = `cafe-bert/food/categories/${categoryId}`;

                try {
                    await fs.updateField(path, 'consumptions', category.consumptions);
                    sb.openSnackbar('visibility food updated');
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`);
                }
            },

            async removeFoodFromCategory(categoryId: string, foodIndex: number): Promise<void> {
                const categories = store.foodCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                // Category not found
                if (categoryIndex === -1) {
                    sb.openSnackbar('no food category found');
                    return; // <-- now clearly a Promise<void> because of async
                }

                // Clone immutable state
                const updatedCategories = structuredClone(categories);
                const category = updatedCategories[categoryIndex];

                // Remove food
                category.consumptions.splice(foodIndex, 1);

                // Update local store
                patchState(store, { foodCategories: updatedCategories });

                // Firestore update
                const path = `cafe-bert/food/categories/${categoryId}`;

                try {
                    await fs.updateField(path, 'consumptions', category.consumptions);
                    sb.openSnackbar('food removed');
                } catch (err) {
                    console.error(err);
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`);
                }
            },


            async updateFood(categoryId: string, foodIndex: number, food: Consumption): Promise<void> {
                const categories = store.foodCategories();
                const categoryIndex = categories.findIndex(c => c.id === categoryId);

                if (categoryIndex === -1) {
                    sb.openSnackbar('no food category found');
                    return Promise.resolve();
                }

                // Clone immutable
                const updatedCategories = structuredClone(categories);
                const updatedCategory = updatedCategories[categoryIndex];

                // Update item
                updatedCategory.consumptions[foodIndex] = food;

                // Update signal store (local state)
                patchState(store, { foodCategories: updatedCategories });

                // Update Firestore (remote state)
                const path = `cafe-bert/food/categories/${categoryId}`;

                try {
                    await fs.updateField(path, 'consumptions', updatedCategory.consumptions)
                    sb.openSnackbar('food updated')
                } catch (err) {
                    console.error(err)
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                }
            },
            async moveUp(categoryId: string, consumption: Consumption) {
                const oldConsumptions: Consumption[] = store.foodCategories().filter((c => c.id === categoryId))[0].consumptions;
                const index = oldConsumptions.findIndex(c => c === consumption)

                if (index <= 0) return;
                const newConsumptions: Consumption[] = moveUp(oldConsumptions, index);
                patchState(store, {
                    foodCategories: store.foodCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, consumptions: newConsumptions }
                            : c
                    )
                });
                const path = `cafe-bert/food/categories/${categoryId}`
                try {
                    await fs.updateField(path, 'consumptions', newConsumptions);
                    sb.openSnackbar(`consumptions array updated`)
                } catch (err) {
                    console.log(err)
                    sb.openSnackbar(`operation failed due to: ${(err as FirebaseError).message}`)
                }
            },

            async moveDown(categoryId: string, consumption: Consumption) {
                const oldConsumptions: Consumption[] = store.foodCategories().filter((c => c.id === categoryId))[0].consumptions;
                const index = oldConsumptions.findIndex(c => c === consumption);
                if (index < 0 || index >= oldConsumptions.length - 1) return;
                const newConsumptions: Consumption[] = moveDown(oldConsumptions, index)
                patchState(store, {
                    foodCategories: store.foodCategories().map(c =>
                        c.id === categoryId
                            ? { ...c, consumptions: newConsumptions }
                            : c
                    )
                });
                const path = `cafe-bert/food/categories/${categoryId}`
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
