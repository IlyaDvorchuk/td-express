import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/response/IUser";
import $api, {API_URL} from "../http";
import {IProductCardRes} from "../models/IProductCard";
import {ICartReq} from "../models/ICart";
import {ICartRes} from "../models/response/ICartRes";
import {IOrder, IOrderRes} from "../models/IOrder";
import {INotification} from "../models/INotification";
import {OrderEnum} from "../models/enums";
import {ISellerByUser} from "../models/response/ISellerByUser";
import {IComment, ICommentRes} from "../models/IComment";
import {IDeliveryCityCart} from "../models/IDeliveryCity";
import {IDeliveryPoint2} from "../models/IDeliveryPoint";
import {IFeedback} from "../models/IFeedback";

export class UserService {
    static async fetchUser(): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/auth/users')
    }

    static addToFavorites(goodId: string, sellerId: string): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>(`users/addToFavorite/${goodId}/${sellerId}`)
    }

    static deleteFavorites(goodId: string, sellerId: string): Promise<AxiosResponse<boolean>> {
        return $api.delete<boolean>(`users/removeFromFavorite/${goodId}/${sellerId}`)
    }

    static getFavorites(): Promise<AxiosResponse<IProductCardRes[]>> {
        return $api.get<IProductCardRes[]>(`users/getFavorites/`)
    }

    static addToCart(sellerId: string, cart: ICartReq): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>(`users/addToCart/${sellerId}`, cart)
    }

    static deleteCarts(cart: string[], sellers: string[]): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>('users/deleteCart', {
            productCardIds: cart,
            sellerIds: sellers
        });
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
        return $api.get(`orders/user/${userId}`);
    }

    static async getOrder(id: string): Promise<AxiosResponse<IOrderRes>> {
        return axios.get<IOrderRes>(`${API_URL}orders/${id}`)
    }

    static changeStatus(idOrder: string, status: OrderEnum): Promise<AxiosResponse<IOrderRes[]>> {
        return $api.put(`orders/${idOrder}/${status}`)
    }

    static getSeller(name: string): Promise<AxiosResponse<ISellerByUser>> {
        return axios.get<ISellerByUser>(`${API_URL}shelters/user/${name}`)
    }

    static createComment(comment: IComment): Promise<AxiosResponse<ISellerByUser>> {
        return $api.post<ISellerByUser>(`${API_URL}reviews`, comment)
    }

    static getCommentsByProduct(productId: string): Promise<AxiosResponse<ICommentRes[]>> {
        return $api.get<ICommentRes[]>(`${API_URL}reviews/${productId}`)
    }

    static createFeedback(feedback: IFeedback): Promise<AxiosResponse<ISellerByUser>> {
        return $api.post<ISellerByUser>(`${API_URL}feedback`, feedback)
    }

    static getDeliveryCart(
        idShelters: string[]
    ): Promise<AxiosResponse<IDeliveryCityCart | string>> {
        return $api.get(`delivery/cart/${JSON.stringify(idShelters)}`)
    }

    static getDeliveryPointsSeller(
        idShelter: string,
        pointIds: string
    ): Promise<AxiosResponse<IDeliveryPoint2[]>> {
        return axios.get(`${API_URL}shelters/delivery-points-user/${idShelter}`, {
            params: {
                pointIds: pointIds
            }
        })
    }
}
