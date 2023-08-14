import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/response/IUser";
import $api from "../http";
import {IProductCardRes} from "../models/IProductCard";
import {ICartReq} from "../models/ICart";
import {ICartRes} from "../models/response/ICartRes";

export class UserService {
    static async fetchUser(): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/auth/users')
    }

    static addToFavorites(goodId: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`users/addToFavorite/${goodId}`)
    }

    static getFavorites(): Promise<AxiosResponse<IProductCardRes[]>> {
        return $api.get<IProductCardRes[]>(`users/getFavorites/`)
    }

    static addToCart(cart: ICartReq): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>(`users/addToCart`, cart)
    }

    static deleteCarts(cart: string[]): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>('users/deleteCart', {idsCart: cart});
    }

    static async getUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`users/get-user`)
    }

    static async getCart(): Promise<AxiosResponse<ICartRes[]>> {
        return $api.get<ICartRes[]>(`users/get-cart`)
    }

    static async setCountCart(typeId: string, count: number){
        return $api.get(`users/set-count-cart/${typeId}/${count}`)
    }

    static async setBank() {
        const formData = new FormData();
        formData.append('MerchantLogin', '000209')
        formData.append('RequestCurrCode', '000')
        formData.append('RequestSum', '1000')
        formData.append('nivid', '122')
        formData.append('Desc', 'Оплата товара №122')
        formData.append('istest', '1')
        formData.append('SignatureValue', '6d223ad3b2abe31d65ed35494c6d7788')
        return axios.post(`https://www.agroprombank.com/payments/PaymentStart`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
}
