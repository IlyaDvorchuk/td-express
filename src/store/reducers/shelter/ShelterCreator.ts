import {AppDispatch} from "../../store";
import {AuthService} from "../../../services/AuthService";
import {shelterSlice} from "./ShelterSlice";
import {IShelter} from "../../../models/response/IShelter";
import {AuthShelterService} from "../../../services/AuthShelterService";
import {getAccessTokenFromCookieShelter, setAccessTokenShelter} from "../../../utils/tokens";
import {ShelterService} from "../../../services/ShelterService";
import {IProductCard} from "../../../models/IProductCard";

export const sendCodeShelter = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const response = await AuthService.sendCode(email)
        console.log('response', response)
        dispatch(shelterSlice.actions.setActivationCode(response.data))
        dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
    }
}

export const registrationShelter = (data: IShelter, photo: File, imageShop: File) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const formData = new FormData();
        console.log('data', data)
        formData.append('fileScan', photo);
        formData.append('imageShop', imageShop);
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value !== 'string') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });
        const response = await AuthShelterService.registrationShelter(formData)
        console.log('response', response)
        dispatch(shelterSlice.actions.setAuth(true))
        dispatch(shelterSlice.actions.setShelter(response.data.shelter))
        dispatch(shelterSlice.actions.setIsRegistered(true))
        const accessToken = getAccessTokenFromCookieShelter();
        if (accessToken) {
            setAccessTokenShelter(accessToken);
            dispatch(shelterSlice.actions.setLoginSuccess(accessToken));
        }
        dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
        dispatch(shelterSlice.actions.setIsRegistered(false))
    }
}

export const loginShelter = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        console.log('hey bruh')

        dispatch(shelterSlice.actions.loginFetching())
        const response = await AuthShelterService.login(email, password)
        console.log('response', response)
        dispatch(shelterSlice.actions.setAuth(true))
        dispatch(shelterSlice.actions.setShelter(response.data))
        const accessToken = getAccessTokenFromCookieShelter();
        console.log('accessToken login', accessToken)
        if (accessToken) {
            setAccessTokenShelter(accessToken);
            dispatch(shelterSlice.actions.setLoginSuccess(accessToken));
        }
        dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
    }
}

export const createNewPasswordShelter = (email: string ,password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        await AuthShelterService.createNewPassword(email, password)
        dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
    }
}

export const getPointIssues = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const response = await ShelterService.getPointsIssue()
        // await AuthShelterService.createNewPassword(email, password)
        dispatch(shelterSlice.actions.setDeliveryPoints(response.data))
        dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
    }
}

export const createProductCard = (good: IProductCard, mainPhoto: File, additionalPhotos: File[]) => async (dispatch: AppDispatch) => {
    try {
        console.log('good', good)
        const formData = new FormData();
        formData.append('mainPhoto', mainPhoto);
        additionalPhotos.forEach((photo) => {
            formData.append(`additionalPhotos`, photo);
        });
        Object.entries(good).forEach(([key, value]) => {
            if (typeof value !== 'string') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });
        const response = await ShelterService.createGoodCard(formData)
        if (response) {
            dispatch(shelterSlice.actions.setCreateGoodCard(true))
        } else {
            dispatch(shelterSlice.actions.setCreateGoodCard(false))
        }
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.setCreateGoodCard(false))
    }
}

export const getShelter = () => async (dispatch: AppDispatch) => {
    try {
        const response = await ShelterService.getShelter()
        console.log('response.data', response.data)
        dispatch(shelterSlice.actions.setShelter(response.data))
    } catch (e) {
        console.log('e', e)
    }
}
