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
        dispatch(searchSlice.actions.searchFetching())
        console.log('params 13', params)
        const response = await GoodsService.getSearchGoods(params);
        if (!isChange) {
            dispatch(filterSlice.actions.setRange({
                maxPriceRange: response.data.maxPriceRange,
                minPriceRange: response.data.minPriceRange,
            }))
            dispatch(filterSlice.actions.setCurrentMaxPrice(response.data.maxPriceRange))
            dispatch(filterSlice.actions.setCurrentMinPrice(response.data.minPriceRange))
        }

        console.log('hey hey', response)
        dispatch(searchSlice.actions.searchFetchingSuccess(response.data.productCards))
    } catch (e: any) {
        console.log('e', e)
        dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
    }
}
