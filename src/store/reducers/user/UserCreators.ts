import {AppDispatch} from "../../store";

import {userSlice} from "./UserSlice";
import {AuthService} from "../../../services/AuthService";
import {IUser} from "../../../models/response/IUser";
import {removeAccessTokenShelter, setAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";
import {IOrder} from "../../../models/IOrder";
import {AdminService} from "../../../services/AdminService";

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        const response = await AuthService.login(email, password)
        console.log('response', response)
        dispatch(userSlice.actions.setAuth(true))
        const accessToken = response.data.token;
        if (accessToken) {
            setAccessTokenUser(accessToken);
            dispatch(userSlice.actions.loginSuccess())
            dispatch(userSlice.actions.setUser(response.data.user))
            removeAccessTokenShelter()
        } else {
            dispatch(userSlice.actions.loginFetchingError('Не получилось'))
        }
    } catch (e: any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

export const registrationUser = (user: IUser, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        const response = await AuthService.registration(user, password)
        // localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
        const accessToken = response.data.token;
        if (accessToken) {
            setAccessTokenUser(accessToken);
            dispatch(userSlice.actions.loginSuccess())
        } else {
            dispatch(userSlice.actions.loginFetchingError('Не получилось'))
        }

    } catch (e: any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(userSlice.actions.setAuth(false))
        dispatch(userSlice.actions.setUser({} as IUser))
        dispatch(userSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

// export const checkAuth = () => async (dispatch: AppDispatch) => {
//     try {
//         const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//         localStorage.removeItem('token')
//         localStorage.setItem('token', response.data.accessToken)
//         dispatch(userSlice.actions.setAuth(true))
//         dispatch(userSlice.actions.setUser(response.data.user))
//     } catch (e: any) {
//         console.log('e', e)
//         dispatch(userSlice.actions.loginFetchingError(e.message))
//     }
// }

export const sendCode = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        const response = await AuthService.sendCode(email)
        console.log('response', response)
        dispatch(userSlice.actions.setActivationCode(response.data))
        dispatch(userSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        const response = await AuthService.checkEmail(email)
        dispatch(userSlice.actions.loginSuccess())
        return response.data
    } catch (e:any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

export const getUser = () => async (dispatch: AppDispatch) => {
    try {
        const response = await UserService.getUser()
        dispatch(userSlice.actions.setUser(response.data))
        dispatch(userSlice.actions.setIsLoaded(true))


    } catch (e: any) {
        console.log('e getUser', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
        dispatch(userSlice.actions.setIsLoaded(true))
    }
}

export const createNewPasswordUser = (email: string ,password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loginFetching())
        await AuthService.createNewPassword(email, password)
        dispatch(userSlice.actions.loginSuccess())
    } catch (e: any) {
        console.log('e', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

export const createOrder = (order: IOrder) => async (dispatch: AppDispatch) => {
    try {

        dispatch(userSlice.actions.loginFetching())
        const response = await UserService.createOrder(order)


        let deliveryString = ''
        if (order.deliveryMethod === 'pickup') {
            deliveryString = 'Самовывозом'
        } else if (order.deliveryMethod === 'doorstep') {
            deliveryString = `Адрес: г. ${order?.city},
            ул. ${order?.deliveryAddress?.street},  
            д. ${order?.deliveryAddress?.house}
            ${order?.deliveryAddress?.entrance ? 'п. ' + order?.deliveryAddress?.entrance : ''}
            ${order?.deliveryAddress?.floor ? 'э. ' + order?.deliveryAddress?.floor : ''}
            ${order?.deliveryAddress?.apartment ? 'кв. ' + order?.deliveryAddress?.apartment : ''}
            ${order?.deliveryAddress?.comment ? 'комментарий покупателя ' + order?.deliveryAddress?.comment : ''}
            `
        }

        const currentDate = new Date();

        const dayOfWeek = currentDate.getDay();

        const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

        const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear().toString().slice(-2)} ${daysOfWeek[dayOfWeek]} ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

        for (let type of order.orderTypes) {
            const totalOrderCount = order.orderTypes.reduce((sum, orderType) => sum + orderType.count, 0);

            await AdminService.createNotification(
                type.shelterId,
                `<p>Ваш товар <b>“${type.goodName} ${order?.currentType?.size ? `, ${order.currentType.size}` : ''} ${order?.currentType?.color ? `, ${order.currentType.color}` : ''}”</b> был заказан в количестве  <b>${totalOrderCount} штук</b>.</p>
                <p>${deliveryString}</p>
                <p>${formattedDate}</p>`
            )
        }

        if (response.data) {
            dispatch(userSlice.actions.loginSuccess())
        } else {
            dispatch(userSlice.actions.loginFetchingError('Не удалось оформить заказ'))
        }
    } catch (e: any) {
        console.log('e createOrder', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}
