import {AxiosResponse} from "axios";
import {IUser} from "../models/response/IUser";
import $api from "../http";
import {IProductCardRes} from "../models/IProductCard";
import {ICart} from "../models/ICart";

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

    static addToCart(cart: ICart): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>(`users/addToCart`, cart)
    }

    static async getUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`users/get-user`)
    }

    static async getCart(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`users/get-cart`)
    }
}
