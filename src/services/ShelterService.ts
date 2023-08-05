import {AxiosResponse} from "axios";
import {$apiShelter} from "../http";
import {IDeliveryPoint, IDeliveryPoint2} from "../models/IDeliveryPoint";
import {IProductCard, IProductCardRes} from "../models/IProductCard";
import {IShelterALL, IShelterData, IShelterRes, IShelterShop} from "../models/response/IShelter";
import {INotification} from "../models/INotification";

export class ShelterService {
    static async getPointsIssue(): Promise<AxiosResponse<IDeliveryPoint2[]>> {
        return $apiShelter.get<IDeliveryPoint2[]>('/shelters/delivery-points')
    }

    static async createGoodCard(good: FormData): Promise<AxiosResponse<IProductCard>> {
        return $apiShelter.post('/product-cards', good, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    static async updateGoodCard(
        good: IProductCard,
        id: string,
        mainPhoto: string,
        additionalPhotos: string[]): Promise<AxiosResponse<IProductCard>> {
        return $apiShelter.put(`/product-cards/${id}`, {
            ...good,
            mainPhoto,
            additionalPhotos
        })
    }

    static async getShelter(): Promise<AxiosResponse<IShelterALL>> {
        return $apiShelter.get<IShelterALL>(`shelters/`)
    }

    static getCardsOfShelter(): Promise<AxiosResponse<IProductCardRes[]>> {
        return $apiShelter.get(`shelters/cards`)
    }

    static getNotificationsOfShelter(): Promise<AxiosResponse<INotification[]>> {
        return $apiShelter.get(`shelters/notifications`)
    }

    static readNotificationsOfShelter(): Promise<AxiosResponse<boolean>> {
        return $apiShelter.get(`shelters/read-notifications`)
    }

    static deleteNotificationsOfShelter(deleteNotifications: string[]): Promise<AxiosResponse<boolean>> {
        return $apiShelter.delete(`shelters/notifications`, {
            data: deleteNotifications
        })
    }

    static deleteCard(id: string): Promise<AxiosResponse<IProductCard>> {
        return $apiShelter.delete(`product-cards/${id}`)
    }

    static updateDataShelter(id: string, shelterData: IShelterData): Promise<AxiosResponse<IShelterRes>> {
        return $apiShelter.put(`shelters/update-data/${id}`, shelterData)
    }

    static updateShopShelter(
        id: string,
        shelterShop: IShelterShop,
        deliveryPoints: IDeliveryPoint[],
        imageShop: string,
    ): Promise<AxiosResponse<IShelterRes>> {
        return $apiShelter.put(`shelters/update-shop/${id}`, {
            shelterShop,
            deliveryPoints,
            imageShop
        })
    }
}
