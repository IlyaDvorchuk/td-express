import {AppDispatch} from "../../store";
import {AuthService} from "../../../services/AuthService";
import {shelterSlice} from "./ShelterSlice";
import {IShelter, IShelterShop} from "../../../models/response/IShelter";
import {AuthShelterService} from "../../../services/AuthShelterService";
import {removeAccessTokenUser, setAccessTokenShelter} from "../../../utils/tokens";
import {ShelterService} from "../../../services/ShelterService";
import {IProductCard} from "../../../models/IProductCard";
import {userSlice} from "../user/UserSlice";
import {IDeliveryPoint} from "../../../models/IDeliveryPoint";

export const sendCodeShelter = (email: string,
                                isNotExamination?: boolean) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const response = await AuthService.sendCode(email, isNotExamination)
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
        // console.log('response', response)
        dispatch(shelterSlice.actions.setAuth(true))
        dispatch(shelterSlice.actions.setShelter(response.data.shelter))
        dispatch(shelterSlice.actions.setIsRegistered(true))
        const accessToken = response.data.token;
        if (accessToken) {
            setAccessTokenShelter(accessToken);
            dispatch(shelterSlice.actions.setLoginSuccess(accessToken));
        }
        // dispatch(shelterSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.loginFetchingError(e.message))
        dispatch(shelterSlice.actions.setIsRegistered(false))
    }
}

export const loginShelter = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const response = await AuthShelterService.login(email, password)
        dispatch(shelterSlice.actions.setAuth(true))
        dispatch(shelterSlice.actions.setShelter(response.data.shelter))
        // const accessToken = getAccessTokenFromCookieShelter();
        const accessToken = response.data.token
        // console.log('accessToken 75', accessToken)

        if (accessToken) {
            setAccessTokenShelter(accessToken);
            dispatch(shelterSlice.actions.setLoginSuccess(accessToken));
        }
        removeAccessTokenUser()
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
        if (response.data?._id) {
            dispatch(shelterSlice.actions.setCreateGoodCard(true))
        } else dispatch(shelterSlice.actions.setCreateGoodCard(false))
    } catch (e: any) {
        console.log('e', e)
        dispatch(shelterSlice.actions.setCreateGoodCard(false))
    }
}

export const updateProductCard = (good: IProductCard, id: string, mainPhoto: File | string, additionalPhotos: (File | string)[]) => async (dispatch: AppDispatch) => {
    try {
        let mainPhotoBase64: string | undefined;
        let additionalPhotosBase64: string[] = [];

        // Преобразование mainPhoto в base64
        if (mainPhoto instanceof File) {
            const mainPhotoBase64Promise = new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    resolve(base64String);
                };

                reader.onerror = reject;

                reader.readAsDataURL(mainPhoto);
            });

            mainPhotoBase64 = await mainPhotoBase64Promise;
        } else {
            mainPhotoBase64 = mainPhoto as string;
        }

        // Преобразование additionalPhotos в base64
        for (const item of additionalPhotos) {
            if (item instanceof File) {
                const additionalPhotoBase64Promise = new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const base64String = reader.result as string;
                        resolve(base64String);
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(item);
                });

                const additionalPhotoBase64 = await additionalPhotoBase64Promise;
                additionalPhotosBase64.push(additionalPhotoBase64);
            } else {
                additionalPhotosBase64.push(item as string);
            }
        }

        // Удаление значений undefined из additionalPhotosBase64
        additionalPhotosBase64 = additionalPhotosBase64.filter(item => item !== undefined);

        console.log('good', good)
        // Выполнение запроса с использованием mainPhotoBase64 и additionalPhotosBase64
        const response = await ShelterService.updateGoodCard(good, id, mainPhotoBase64, additionalPhotosBase64);
        if (response.data) {
            dispatch(shelterSlice.actions.updateCardSuccess())
        }
    } catch (e: any) {
        console.log('e', e);
        dispatch(shelterSlice.actions.updateCardFalse());
    }
};


export const updateShopShelter = (
                                    id: string,
                                    shelterShop: IShelterShop,
                                  deliveryPoints: IDeliveryPoint[],
                                  imageShop: File | string
                                ) => async (dispatch: AppDispatch) => {
    try {
        let shopPhotoBase64: string | undefined;

        // Преобразование mainPhoto в base64
        if (imageShop instanceof File) {
            const shopPhotoBase64Promise = new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    resolve(base64String);
                };

                reader.onerror = reject;

                reader.readAsDataURL(imageShop);
            });

            shopPhotoBase64 = await shopPhotoBase64Promise;
        } else {
            shopPhotoBase64 = imageShop as string;
        }

        // Выполнение запроса с использованием shopPhotoBase64 и additionalPhotosBase64
        const response = await ShelterService.updateShopShelter(
            id, shelterShop, deliveryPoints,  shopPhotoBase64
        );
        if (response.data) {
            dispatch(shelterSlice.actions.setShelter(response.data))
            dispatch(shelterSlice.actions.updateShopShelter(true))
        }
    } catch (e: any) {
        console.log('e', e);
        dispatch(shelterSlice.actions.updateShopShelter(false));
    }
};



export const getShelter = () => async (dispatch: AppDispatch) => {
    try {
        const response = await ShelterService.getShelter()
        // console.log('response.data', response.data)
        console.log('response', response.data)
        dispatch(shelterSlice.actions.setShelterAll(response.data))
    } catch (e) {
        console.log('e', e)
    }
}

export const checkShelter = (email: string, phone: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shelterSlice.actions.loginFetching())
        const response = await AuthShelterService.checkShelter(email, phone)
        // console.log('response checkEmailShelter', response)
        dispatch(shelterSlice.actions.loginSuccess())
        return response.data
    } catch (e:any) {
        console.log('e checkEmailShelter', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}
