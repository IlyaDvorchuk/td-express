import axios, {AxiosResponse} from "axios";
import {API_URL} from "../http";
import {IPaginationCards} from "../models/response/IPaginationCards";
import {IProductCardRes, ITypeRes} from "../models/IProductCard";
import {ICategory, ISection, ISubcategory} from "../models/ICategories";
import {IShelterForGood} from "../models/response/IShelter";
import {IFilterCategoriesParams, IFilterSearchParams, IFilterSellerParams} from "../models/IFilter";

export class GoodsService {
    static async getNewGoods(page: number, limit: number, userId: string): Promise<AxiosResponse<IPaginationCards>> {
        return axios.get<IPaginationCards>(`${API_URL}product-cards/new`, {
            params: {
                page,
                limit,
                userId
            }
        })
    }

    static async getHotGoods(page: number, limit: number, userId: string): Promise<AxiosResponse<IPaginationCards>> {
        return axios.get<IPaginationCards>(`${API_URL}product-cards/hot-offers`, {
            params: {
                page,
                limit,
                userId
            }
        })
    }

    static async getSellerCards(params: IFilterSellerParams): Promise<AxiosResponse<IPaginationCards>> {
        const { name, page, limit, minPrice, maxPrice, colors, userId } = params;
        return axios.get<IPaginationCards>(`${API_URL}shelters/seller-cards/${name}`, {
            params: {
                page,
                limit,
                minPrice,
                maxPrice,
                colors,
                userId
            }
        })
    }

    static async getCategoryGoods(params: IFilterCategoriesParams): Promise<AxiosResponse<IPaginationCards>> {
        const {
            category, page, limit, minPrice, maxPrice, colors, userId
        } = params;
        return axios.get<IPaginationCards>(`${API_URL}product-cards/category/${category}`, {
            params: {
                page,
                limit,
                minPrice,
                maxPrice,
                colors,
                userId
            }
        })
    }

    static async getCategory(category: string): Promise<AxiosResponse<ICategory | ISubcategory | ISection>> {
        return axios.get<ICategory | ISubcategory | ISection>(`${API_URL}categories/category/${category}`)
    }

    static async getSearchGoods(params: IFilterSearchParams): Promise<AxiosResponse<IPaginationCards>> {
        const { query, page, limit, minPrice, maxPrice, colors, userId } = params;
        return axios.get<IPaginationCards>(`${API_URL}product-cards/search/`, {
            params: {
                query,
                page,
                limit,
                minPrice,
                maxPrice,
                colors,
                userId
            }
        })
    }

    static async getGood(id: string, userId: string = ''): Promise<AxiosResponse<IProductCardRes>> {
        return axios.get<IProductCardRes>(`${API_URL}product-cards/${id}`, {
            params: {
                userId
            }
        })
    }

    static async getShelterByGood(id: string) {
        return axios.get<IShelterForGood>(`${API_URL}shelters/good/${id}`)
    }

    static async getType(productId: string, typeId: string) {
        return axios.get<ITypeRes>(`${API_URL}product-cards/type/${productId}/${typeId}`)
    }

    static async updateCountGood(productId: string) {
        return axios.get(`${API_URL}product-cards/view-count/${productId}`)
    }
}
