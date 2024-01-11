export interface ICart {
    productId: string;
    quantity: number;
    // totalPrice: number;
    // isFavorite: boolean;
    size?: string;
    color?: string;
    nameShelter: string
}

export interface ICartReq extends ICart{
    typeId: string
}
