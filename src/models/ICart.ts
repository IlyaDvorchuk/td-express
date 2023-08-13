export interface ICart {
    productId: string;
    quantity: number;
    // totalPrice: number;
    // isFavorite: boolean;
    size?: string;
}

export interface ICartReq extends ICart{
    typeId: string
}