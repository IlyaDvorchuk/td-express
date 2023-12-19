import {AxiosResponse} from "axios";
import $api from "../http";
import {IShelterRes} from "../models/response/IShelter";
import {IProductCardRes} from "../models/IProductCard";
import {IOrderRes} from "../models/IOrder";

export class AdminService {
    static async fetchNotVerifiedShelters(): Promise<AxiosResponse<IShelterRes[]>> {
        return $api.get<IShelterRes[]>('/admin/unverified-shelter')
    }

    static async agreementShelter(id: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`/admin/agreement-shelter/${id}`)
    }

    static async createNotification(id: string, text: string, isUser?: boolean): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>(`/admin/create-notification/${id}`, {
            text,
            isUser
        });
    }

    static async fetchModerationGoods(): Promise<AxiosResponse<IProductCardRes[]>> {
        return $api.get<IProductCardRes[]>('/admin/unpublished', {
            params: {
                page: 1,
                limit: 20
            }
        })
    }

    static async fetchShelterName(id: string): Promise<AxiosResponse<string>> {
        return $api.get<string>(`/admin/name-shelter/${id}`)
    }

    static async agreementGood(id: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`/admin/agreement-good/${id}`)
    }

    static async rejectGood(id: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`/admin/reject-good/${id}`)
    }

    static async getMarketOrders(): Promise<AxiosResponse<IOrderRes[]>> {
        return $api.get<IOrderRes[]>(`/orders/market/`)
    }

    static async getSellerOrders(): Promise<AxiosResponse<IOrderRes[]>> {
        return $api.get<IOrderRes[]>(`/orders/market/`)
    }
}
