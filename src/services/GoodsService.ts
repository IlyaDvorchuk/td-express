import axios, {AxiosResponse} from "axios";
import {API_URL} from "../http";
import {IPaginationCards} from "../models/response/IPaginationCards";
import {IProductCardRes} from "../models/IProductCard";
import {ICategory, ISection, ISubcategory} from "../models/ICategories";

export class GoodsService {
    static async getNewGoods(page: number, limit: number): Promise<AxiosResponse<IPaginationCards>> {
        return axios.get<IPaginationCards>(`${API_URL}product-cards/new`, {
            params: {
                page,
                limit
            }
        })
    }

    static async getHotGoods(page: number, limit: number): Promise<AxiosResponse<IPaginationCards>> {
        return axios.get<IPaginationCards>(`${API_URL}product-cards/hot-offers`, {
            params: {
                page,
                limit
            }
        })
    }

    static async getCategoryGoods(category: string, page: number, limit: number): Promise<AxiosResponse<IProductCardRes[]>> {
        return axios.get<IProductCardRes[]>(`${API_URL}product-cards/category/${category}`, {
            params: {
                page,
                limit
            }
        })
    }

    static async getCategory(category: string): Promise<AxiosResponse<ICategory | ISubcategory | ISection>> {
        return axios.get<ICategory | ISubcategory | ISection>(`${API_URL}categories/${category}`)
    }

    static async getSearchGoods(query: string, page: number, limit: number): Promise<AxiosResponse<IPaginationCards>> {
        return axios.get<IPaginationCards>(`${API_URL}product-cards/search/`, {
            params: {
                query,
                page,
                limit
            }
        })
    }

    static async getGood(id: string): Promise<AxiosResponse<IProductCardRes>> {
        return axios.get<IProductCardRes>(`${API_URL}product-cards/${id}`, )
    }
}
