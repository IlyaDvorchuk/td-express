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
        window.location.href = 'https://www.agroprombank.com/payments/PaymentStart?' + formData.toString();
        return fetch(`https://www.agroprombank.com/payments/PaymentStart`, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            // mode: 'no-cors'
        });
    }

    static async setBankFetch() {

        const requestData = new URLSearchParams();
        requestData.append('MerchantLogin', '000209');
        requestData.append('nivid', '122');
        requestData.append('IsTest', '1');
        requestData.append('RequestSum', '2700');
        requestData.append('RequestCurrCode', '000');
        requestData.append('Desc', 'оплата.заказа.122');
        requestData.append('SignatureValue', 'b8720aa391629445b1e3392a2fafa1b3');

        const url = 'https://www.agroprombank.com/payments/PaymentStart';

        const requestOptions = {
            method: 'POST',
            body: requestData,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'ASP.NET_SessionId=3nyivdagyrnut4v2gfhypfkf; _ym_uid=1692805569205897369; _ym_d=1692805569; lang=ru; _ym_isad=1'
                // Другие заголовки, если необходимо
            }
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                // Обработка ответа сервера
                console.log(result);
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка:', error);
            });
    }

    static async setBankGet() {
// Создание параметров запроса
        const requestData = new URLSearchParams();
        requestData.append('MerchantLogin', '000209');
        requestData.append('nivid', '122');
        requestData.append('IsTest', '1');
        requestData.append('RequestSum', '2700');
        requestData.append('RequestCurrCode', '000');
        requestData.append('Desc', 'оплата.заказа.122');
        requestData.append('SignatureValue', 'b8720aa391629445b1e3392a2fafa1b3');

// URL для запроса
        const url = 'https://www.agroprombank.com/payments/PaymentStart';

// Опции запроса
        const requestOptions = {
            method: 'POST',
            body: requestData
        };

// Отправка запроса
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                // Обработка ответа сервера
                console.log(result);
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка:', error);
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
