import {IDeliveryPoint2} from "../IDeliveryPoint";

export interface IShelter {
    id?: string,
    password?: string,
    email: string,
    name: string,
    phone: string,
    shelterData: {
        personalData: IPersonalData,
        closePerson: IClosePerson,
        entity: IEntity
    },
    shop: IShelterShop,
    deliveryPoints: IDeliveryPoint2[],
    isVerified: boolean
}

export interface IShelterRes {
    _id: string,
    password?: string,
    email: string,
    name: string,
    phone: string,
    shelterData: IShelterData,
    imageShop: string,
    shop: IShelterShop,
    deliveryPoints: IDeliveryPoint2[],
    isVerified: boolean,
    createdAt: Date
}

export interface IShelterALL {
    shelter: IShelterRes,
    unreadCount: number
}

export interface IShelterData {
    personalData: IPersonalData,
    closePerson: IClosePerson,
    entity: IEntity
}

export interface IMainShelter {
    email: string,
    name: string,
    phone: string,
    password: string
}

export interface IPersonalData {
    name: string,
    family: string,
    patronymic: string,
    birthday: string
}

export interface IClosePerson {
    name: string,
    family: string,
    patronymic: string,
    phoneClose: string
}

export interface IEntity {
    isIndividual: boolean,
    code: string,
    // photo: File,
    bic: string,
    check: string
}

export interface IShelterShop {
    nameMarket: string,
    description: string,
}
