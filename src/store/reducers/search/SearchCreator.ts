import {AppDispatch} from "../../store";
import {categoriesSlice} from "../categories/CategoriesSlice";
import {searchSlice} from "./SearchSlice";
import {GoodsService} from "../../../services/GoodsService";
import {filterSlice} from "../filter/FilterSlice";
import {IFilterSearchParams} from "../../../models/IFilter";

export const fetchSearch = (
    params: IFilterSearchParams, isChange?: boolean
) => async (dispatch: AppDispatch) => {
    try {
        if (!isChange) {
            dispatch(filterSlice.actions.setResetTrue())
        }

        dispatch(searchSlice.actions.searchFetching())
        const response = await GoodsService.getSearchGoods(params);
        if (!isChange) {
            dispatch(filterSlice.actions.setRange({
                maxPriceRange: response.data.maxPriceRange,
                minPriceRange: response.data.minPriceRange,
            }))
            dispatch(filterSlice.actions.setCurrentMaxPrice(response.data.maxPriceRange))
            dispatch(filterSlice.actions.setCurrentMinPrice(response.data.minPriceRange))
        }

        dispatch(searchSlice.actions.searchFetchingSuccess(response.data.productCards))
        dispatch(filterSlice.actions.setResetFalse())

    } catch (e: any) {
        console.log('e', e)
        dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
    }
}
