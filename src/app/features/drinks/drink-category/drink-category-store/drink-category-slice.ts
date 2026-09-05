import { DrinkCategory } from "../../../../models/drink-category.model"



export interface DrinkCategorySlice {
    readonly drinkCategories: DrinkCategory[]


}

// export type PersistedAppStoreSlice = Pick<AppStoreSlice, 'drinkCategories'>

export const initialDrinkCategorySlice: DrinkCategorySlice = {
    drinkCategories: [],
}
