export interface IDeliveryCity {
    city: string,
    price: string
}

export interface IDeliveryCityCart {
    cities: IDeliveryCity[],
    rate: 'td-delivery' | 'self-delivery'
}
