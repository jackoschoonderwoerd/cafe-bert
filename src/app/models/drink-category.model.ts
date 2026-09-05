import { Consumption } from './consumption.model';
export interface DrinkCategory {
    nameNl: string;
    nameEn: string;
    descriptionNl?: string;
    descriptionEn?: string;
    consumptions: Consumption[];
    orderOfAppearance: number;
    id: string
}
