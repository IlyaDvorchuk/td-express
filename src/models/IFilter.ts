export interface IFilterParams {
    page: number;
    limit: number;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[]
}

export interface IFilterCategoriesParams extends IFilterParams{
    category: string;
}

export interface IFilterSearchParams extends IFilterParams{
    query: string;
}