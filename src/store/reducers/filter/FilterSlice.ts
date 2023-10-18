import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRangePrice} from "../../../models/response/IPaginationCards";

type ColorArrayOrNull = string[] | null;

const initialState = {
    minPrice: -Infinity,
    maxPrice: Infinity,
    currentMinPrice: -Infinity,
    currentMaxPrice: Infinity,
    isChange: false,
    colors: null as ColorArrayOrNull,
    isReset: false
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setRange(state, action: PayloadAction<IRangePrice>) {
            state.minPrice = action.payload.minPriceRange
            state.maxPrice = action.payload.maxPriceRange
            state.isChange = false
        },
        setCurrentMinPrice(state, action: PayloadAction<number>) {
            state.currentMinPrice = action.payload
        },
        setCurrentMaxPrice(state, action: PayloadAction<number>) {
            state.currentMaxPrice = action.payload
        },
        setIsChangeTrue(state) {
            state.isChange = true
        },
        setColors(state, action: PayloadAction<string[]>) {
            if (state.colors) {
                state.isChange = true
            }
            state.colors = action.payload
        },
        setResetFalse(state) {
            state.isReset = false
        },
        setResetTrue(state) {
            state.isReset = true
        },
    }
})

export default filterSlice.reducer
