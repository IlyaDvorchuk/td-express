import {OrderEnum} from "./enums";
import {IType} from "./IProductCard";

export interface OrderType {
    goodName: string
    goodPhoto: string,
    goodId: string,
    typeId: string,
    shelterId: string,
    price: number,
    count: number,
}

export interface IOrder {
    currentType?: IType,
    orderId: string
    orderTypes: OrderType[],
    price: number,
    userId: string | null,
    shelterIds: string[],
    status: OrderEnum,
    deliveryMethod: 'pickup' | 'express' | 'doorstep',
    paymentMethod: 'bankCard' | 'qrCode' | 'cash',
    buyer: {
        family: string,
        name: string,
        phone: string,
    },

    city: string,
    deliveryAddress?: {
        street: string,
        house: string,
        entrance?: string,
        floor?: string,
        apartment?: string,
        comment?: string,
        deliveryPrice: number
    }
    isTdMarket: boolean
}

export interface IOrderRes extends IOrder {
    _id: string,
    createdAt: string
}
