import {IPrice, IProductCardRes} from "../IProductCard";

export interface ICartRes {
    color?: string;
    productId: string;
    quantity: number;
    mainPhoto: string,
    price: IPrice,
    name: string,
    _id: string,
    typeId: string,
    nameShelter: string;
    // totalPrice: number;
    // isFavorite: boolean;
    size?: string;
    card: IProductCardRes
}
