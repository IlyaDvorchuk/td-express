import {combineReducers, configureStore} from "@reduxjs/toolkit";
import locationReducer from './reducers/LocationSlice';
import categoriesReducer from './reducers/categories/CategoriesSlice'
import userReducer from './reducers/user/UserSlice'
import shelterReducer from './reducers/shelter/ShelterSlice'
import searchReducer from './reducers/search/SearchSlice'
import filterReducer from './reducers/filter/FilterSlice'
import orderReducer from './reducers/OrderSlice'

const rootReducer = combineReducers({
    locationReducer,
    categoriesReducer,
    userReducer,
    shelterReducer,
    searchReducer,
    filterReducer,
    orderReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
