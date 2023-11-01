import axios, {AxiosResponse} from "axios";
import $api, {API_URL} from "../http";
import {IAuthResponse} from "../models/response/IAuthResponse";
import {IUser} from "../models/response/IUser";

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/login', {email, password})
    }

    static async registration(user: IUser, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/registration', {...user, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }

    static async sendCode(email: string, isNotExamination?: boolean): Promise<AxiosResponse<string>> {
        console.log('isNotExamination', isNotExamination)
        return $api.post<string>('/mail', {
            email,
            isShelter: true,
            isNotExamination
        })
    }

    static async checkEmail(email: string): Promise<AxiosResponse<boolean>> {
        return axios.post<boolean>(`${API_URL}auth/check`, {email})
    }
}
