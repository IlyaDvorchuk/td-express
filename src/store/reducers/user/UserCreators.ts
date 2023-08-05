import {AppDispatch} from "../../store";

import {userSlice} from "./UserSlice";
import {AuthService} from "../../../services/AuthService";
import {IUser} from "../../../models/response/IUser";
import {removeAccessTokenShelter, setAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";

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
        console.log('response', response)
        dispatch(userSlice.actions.setUser(response.data))
    } catch (e: any) {
        console.log('e getUser', e)
        dispatch(userSlice.actions.loginFetchingError(e.message))
    }
}

