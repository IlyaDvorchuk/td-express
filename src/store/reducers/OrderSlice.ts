import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductCardRes, ITypeRes} from "../../models/IProductCard";
import {IDeliveryCity} from "../../models/IDeliveryCity";

export interface IOrderSlice {
    cards: {
        card: IProductCardRes,
        currentType: ITypeRes | null | undefined,
        count: number,
    }[]
    deliveryCities: IDeliveryCity[],
    marketDelivery: "td-delivery" | "self-delivery" | undefined,
}

const initialState: IOrderSlice = {
    cards: [],
    deliveryCities: [],
    marketDelivery: undefined

}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

        createStoreOrder(state, action: PayloadAction<IOrderSlice>) {
            const { cards, deliveryCities, marketDelivery } = action.payload;
            state.cards = cards;
            state.deliveryCities = deliveryCities;
            state.marketDelivery = marketDelivery;
        },

        deleteOrder(state) {
            state = {
                cards: [],
                marketDelivery: undefined,
                deliveryCities: []

            }
        }
    }
})

export default orderSlice.reducer
