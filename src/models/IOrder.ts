export interface IOrder {
    goodName: string
    goodPhoto: string,
    goodId: string,
    typeId: string,
    userId: string | null,
    shelterId: string,
    status: string,
    deliveryMethod: 'pickup' | 'express' | 'doorstep',
    paymentMethod: 'bankCard' | 'qrCode' | 'cash',
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
    _id: string,
    createdAt: string
}
