import { DrinkCategory } from "../../../models/drink-category.model"



export interface FoodCategorySlice {
    readonly foodCategories: DrinkCategory[]


}

// export type PersistedAppStoreSlice = Pick<AppStoreSlice, 'drinkCategories'>

export const initialFoodCategorySlice: FoodCategorySlice = {
    foodCategories: [],
}
