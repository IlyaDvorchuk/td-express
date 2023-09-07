export interface IOrder {
    goodPhoto: string,
    goodId: string,
    typeId: string,
    userId: string | null,
    shelterId: string,
    status: string,
    deliveryMethod: string,
    paymentMethod: string,
    buyer: {
        family: string,
        name: string,
        phone: string,
    },
    price: number,
    count: number,
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
}

export interface IOrderRes extends IOrder {
    _id: string
}