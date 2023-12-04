import {AxiosResponse} from "axios";
import {$apiShelter} from "../http";
import {IDeliveryPoint, IDeliveryPoint2} from "../models/IDeliveryPoint";
import {ICreateProductCardRes, IProductCard, IProductCardRes} from "../models/IProductCard";
import {IShelterALL, IShelterData, IShelterRes, IShelterShop} from "../models/response/IShelter";
import {INotification} from "../models/INotification";
import {IDeliveryCity} from "../models/IDeliveryCity";
import {IOrderRes} from "../models/IOrder";
import {OrderEnum} from "../models/enums";
import {ColorImage, IColor} from "../models/IColor";

export class ShelterService {
    static async getPointsIssue(): Promise<AxiosResponse<IDeliveryPoint2[]>> {
        return $apiShelter.get<IDeliveryPoint2[]>('/shelters/delivery-points')
    }

    static async createGoodCard(good: FormData): Promise<AxiosResponse<ICreateProductCardRes>> {
        return $apiShelter.post('/product-cards', good, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    static async addColorToCard(good: ColorImage, productFolder: string, productId: string): Promise<boolean> {
        return $apiShelter.post(`/product-cards/upload/${productFolder}/${productId}`, good)
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
        return $apiShelter.get(`shelters/cards/${1}/${200}`)
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

    static updateDelivery(
        delivery: {deliveryPoints: IDeliveryCity[]}
    ): Promise<AxiosResponse<IShelterRes>> {
        return $apiShelter.post(`delivery/`, delivery)
    }

    static getDelivery(
        idShelter: string
    ): Promise<AxiosResponse<IDeliveryCity[]>> {
        return $apiShelter.get(`delivery/${idShelter}`)
    }

    static getOrdersOfSeller(count?: number): Promise<AxiosResponse<IOrderRes[]>> {
        // Создаем объект с параметрами запроса (query parameters)
        const params: Record<string, any> = {};

        // Если передан параметр count, добавляем его в params
        if (count !== undefined) {
            params.count = count;
        }

        return $apiShelter.get(`orders/seller`, {
            params: params
        });
    }

    static changeStatus(idOrder: string, status: OrderEnum): Promise<AxiosResponse<IOrderRes[]>> {
        return $apiShelter.put(`orders/${idOrder}/${status}`)
    }

    static getColors(): Promise<AxiosResponse<IColor[]>> {
        return $apiShelter.get(`colors`)
    }

    static changeRate(sellerId: string, rate: string): Promise<AxiosResponse<boolean>> {
        return $apiShelter.put(`shelters/update-rate/${sellerId}/${rate}`)
    }
}
