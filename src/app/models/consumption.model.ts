export interface Consumption {
    nameNl: string;
    nameEn?: string;
    descriptionNl?: string;
    descriptionEn?: string;
    price?: number;
    id?: string;
    priceBottle?: number;
    priceKleintje?: number;
    priceFluitje?: number;
    priceVaasje?: number;
    priceCl40?: number;
    hidden?: boolean;

}

export interface Wine extends Consumption {
    priceBottle: number;
}

export interface DraftBeer extends Consumption {
}
