import axios from "axios";
import {IAuthResponse, IAuthShelterResponse} from "../models/response/IAuthResponse";
import {getAccessTokenShelter, getAccessTokenUser} from "../utils/tokens";

export const API_URL = process.env.REACT_APP_API_ENDPOINT

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessTokenUser()}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('access_token_shelter', response.data.token)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
})

export const $apiShelter = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})

$apiShelter.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessTokenShelter()}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<IAuthShelterResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
})

export default $api
