import {IProductCardRes} from "./IProductCard";

export interface ISearch {
    cards: IProductCardRes[],
    isLoading: boolean,
    error: string,
    query: string
}
