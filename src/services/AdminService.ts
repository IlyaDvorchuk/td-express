import {AxiosResponse} from "axios";
import $api from "../http";
import {IShelterRes} from "../models/response/IShelter";
import {IProductCardRes} from "../models/IProductCard";

export class AdminService {
    static async fetchNotVerifiedShelters(): Promise<AxiosResponse<IShelterRes[]>> {
        return $api.get<IShelterRes[]>('/admin/unverified-shelter')
    }

    static async agreementShelter(id: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`/admin/agreement-shelter/${id}`)
    }

    static async createNotification(id: string, text: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`/admin/create-notification/${id}/?text=${text}`);
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
}