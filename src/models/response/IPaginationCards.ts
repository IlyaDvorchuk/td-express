import {IProductCard} from "../IProductCard";

export interface IPaginationCards {
    currentPage: string,
    totalPages: number,
    productCards: IProductCard[],
    minPriceRange: number,
    maxPriceRange: number,
}

export interface IRangePrice {
    minPriceRange: number,
    maxPriceRange: number,
}
