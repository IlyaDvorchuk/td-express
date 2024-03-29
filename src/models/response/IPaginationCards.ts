import {IProductCardRes} from "../IProductCard";

export interface IPaginationCards {
    currentPage: string,
    totalPages: number,
    productCards: IProductCardRes[],
    minPriceRange: number,
    maxPriceRange: number,
    totalCount: number
}

export interface IRangePrice {
    minPriceRange: number,
    maxPriceRange: number,
}
