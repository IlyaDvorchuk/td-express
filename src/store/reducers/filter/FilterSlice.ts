import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRangePrice} from "../../../models/response/IPaginationCards";

const initialState = {
    minPrice: -Infinity,
    maxPrice: Infinity,
    currentMinPrice: -Infinity,
    currentMaxPrice: Infinity,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setRange(state, action: PayloadAction<IRangePrice>) {
            state.minPrice = action.payload.minPriceRange
            state.maxPrice = action.payload.maxPriceRange
        },
        setCurrentMinPrice(state, action: PayloadAction<number>) {
            state.currentMinPrice = action.payload
        },
        setCurrentMaxPrice(state, action: PayloadAction<number>) {
            state.currentMaxPrice = action.payload
        },
    }
})

export default filterSlice.reducer
