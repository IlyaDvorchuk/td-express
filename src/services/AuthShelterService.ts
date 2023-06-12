import {AxiosResponse} from "axios";
import {IAuthShelterResponse} from "../models/response/IAuthResponse";
import {$apiShelter} from "../http";
import {IShelterRes} from "../models/response/IShelter";

export class AuthShelterService {
    static async registrationShelter(shelter: FormData): Promise<AxiosResponse<IAuthShelterResponse>> {
        return $apiShelter.post<IAuthShelterResponse>('/auth-shelter/registration', shelter, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    static async login(email: string, password: string) {
        return $apiShelter.post<IShelterRes>('/auth-shelter/login', {email, password})
    }

    static async createNewPassword(email: string, password: string) {
        return $apiShelter.post<boolean>('/auth-shelter/create-password', {email, password})
    }
}
