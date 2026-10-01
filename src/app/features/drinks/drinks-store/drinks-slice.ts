import { DrinkCategory } from "../../../models/drink-category.model"



export interface DrinksSlice {
    readonly drinkCategories: DrinkCategory[]


}

// export type PersistedAppStoreSlice = Pick<AppStoreSlice, 'drinkCategories'>

export const initialDrinkCategorySlice: DrinksSlice = {
    drinkCategories: [],
}
