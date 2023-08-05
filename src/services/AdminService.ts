import {AxiosResponse} from "axios";
import $api from "../http";
import {IShelterRes} from "../models/response/IShelter";

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
}