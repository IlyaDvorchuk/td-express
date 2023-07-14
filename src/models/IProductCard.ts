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
    pricesAndQuantity: {
        price: number,
        priceBeforeDiscount: number,
        quantity: number
    },
    dimensions: {
        length: number,
        width: number,
        height: number,
        weight: number,
    },
    deliveryPoints: string[],
    typeQuantity?: IType[]
}

export interface IType {
    size: string,
    quantity: string
}
