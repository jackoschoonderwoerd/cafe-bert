import { DrinkCategory } from "../models/drink-category.model";
import { Consumption } from "../models/consumption.model";


export interface AppStoreSlice {

    readonly hot_drinks: Consumption[],
    readonly soda: Consumption[]
    readonly isLoggedIn: boolean,
    readonly activeLanguage: 'nl' | 'en',


}

export type PersistedAppStoreSlice = Pick<AppStoreSlice, 'isLoggedIn'>

export const initialAppStoreSlice: AppStoreSlice = {

    hot_drinks: [],
    soda: [],
    isLoggedIn: false,
    activeLanguage: 'nl',

}
