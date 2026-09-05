import { Consumption } from "../models/consumption.model";

export interface HotDrinksListVm {
    readonly hotDrinks: Consumption[]
}
export interface AuthVm {
    isLoggedIn: boolean
}
