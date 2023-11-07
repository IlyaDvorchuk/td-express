import {AxiosResponse} from "axios";
import {IUser} from "../models/response/IUser";
import $api, {$apiShelter} from "../http";
import {IProductCardRes} from "../models/IProductCard";
import {ICartReq} from "../models/ICart";
import {ICartRes} from "../models/response/ICartRes";
import {IOrder, IOrderRes} from "../models/IOrder";
import {INotification} from "../models/INotification";
import {OrderEnum} from "../models/enums";

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

    static createOrder(order: IOrder): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>('orders', order);
    }

    static getNotificationsOfUser(): Promise<AxiosResponse<INotification[]>> {
        return $api.get(`users/notifications`)
    }

    static readNotificationsOfUser(): Promise<AxiosResponse<boolean>> {
        return $api.get(`users/read-notifications`)
    }

    static deleteNotificationsOfUser(deleteNotifications: string[]): Promise<AxiosResponse<boolean>> {
        return $api.delete(`users/notifications`, {
            data: deleteNotifications
        })
    }

    static getOrdersOfUser(userId: string): Promise<AxiosResponse<IOrderRes[]>> {
        return $apiShelter.get(`orders/user/${userId}`);
    }

    static changeStatus(idOrder: string, status: OrderEnum): Promise<AxiosResponse<IOrderRes[]>> {
        return $apiShelter.put(`orders/${idOrder}/${status}`)
    }
}
