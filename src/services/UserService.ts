import {AxiosResponse} from "axios";
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
        formData.append('nivid', '122')
        formData.append('IsTest', '1')
        formData.append('RequestSum', '2700')
        formData.append('RequestCurrCode', '000')
        formData.append('Desc', 'оплата.заказа.122')
        formData.append('SignatureValue', 'b8720aa391629445b1e3392a2fafa1b3')
        return fetch(`https://www.agroprombank.com/payments/PaymentStart`, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            mode: 'no-cors'
        });
    }

    static async setBankJson() {
        return fetch(`https://www.agroprombank.com/payments/PaymentStart`, {
            method: 'POST',
            body: JSON.stringify({
                'MerchantLogin': '000209',
                'nivid': '122',
                'istest': 1,
                'RequestSum': 2700,
                'RequestCurrCode': '000',
                'Desc': 'оплата.заказа.122',
                'SignatureValue': 'b8720aa391629445b1e3392a2fafa1b3'
            }),
            headers: {
                "Content-Type": "application/json",
            },
            // mode: 'no-cors'
        })
    }

}
