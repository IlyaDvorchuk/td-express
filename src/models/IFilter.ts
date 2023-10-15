export interface IGetGoodsParams {
    category: string;
    page: number;
    limit: number;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[]
}