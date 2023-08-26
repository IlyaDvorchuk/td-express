import {ICities, TCity} from "../../models/ICities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ICities = {
    cities: ['Тирасполь', 'Бендеры', 'Рыбница', 'Дубоссары', 'Слободзея', 'Григориополь', 'Каменка'],
    city: localStorage.getItem('city') as TCity || 'Тирасполь',
    isLoading: false,
    error: ''
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeCity(state, action: PayloadAction<TCity>) {
            state.city = action.payload;
            localStorage.setItem('city', action.payload)
        }
    }
})

export default locationSlice.reducer