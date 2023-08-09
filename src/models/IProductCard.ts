import {StatusEnum} from "./enums";

export interface IPrice {
    price: number,
    priceBeforeDiscount: number,
    quantity: number
}

export interface IProductCard {
    _id: string;
    categories: {
        category: {
            id: string,
            name: string
        },
        subcategory: {
            id: string,
            name: string
        },
        section: {
            id: string,
            name: string
        },
    },
    information: {
        name: string,
        description: string
    },
    mainPhoto: string,
    additionalPhotos: string[],
    additionalInformation: {
        material: string,
        recommendations: string
    },
    pricesAndQuantity: IPrice,
    dimensions: {
        length: number,
        width: number,
        height: number,
        weight: number,
    },
    deliveryPoints: string[],
    typeQuantity?: IType[]
}

export interface IProductCardRes extends IProductCard {
    published: boolean
    viewsCount: number
    createdAt: string,
    updatedAt: string,
    shelterId: string,
    isReject: boolean
}

export interface IProductCardShelter extends IProductCardRes {
    countGood: number
    status: StatusEnum

}

export interface IType {
    size: string,
    quantity: number,
}
