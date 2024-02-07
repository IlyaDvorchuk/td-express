import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/response/IUser";
import {getAccessTokenUser, removeAccessTokenUser} from "../../../utils/tokens";
import {PopupEnum} from "../../../models/enums";

const initialState = {
    user: {} as IUser,
    unreadCount: 0,
    isUserModal: false,
    isLoaded: false,
    isAuth: false,
    isLoading: false,
    activationCode: '',
    error: '',
    isHoverTools: false,
    accessToken: getAccessTokenUser(),
    isFeedbackModal: true,
    popup: PopupEnum.DEFAULT as PopupEnum
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginFetching(state) {
            state.isLoading = true
        },

        loginSuccess(state) {
            state.isLoading = true
        },

        loginFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        loginCleanError(state) {
            state.isLoading = true
            state.error = ''
        },

        changeIsUserModal: (state, action: PayloadAction<boolean>) => {
            state.isUserModal = action.payload
        },

        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },

        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },

        setEmailUser: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload
        },

        setNameUser: (state, action: PayloadAction<{name: string, family: string}>) => {
            state.user.firstName = action.payload.name
            state.user.secondName = action.payload.family
        },
        setActivationCode: (state, action: PayloadAction<string>) => {
            state.activationCode = action.payload
        },
        setIsHoverTools: (state, action: PayloadAction<boolean>) => {
            state.isHoverTools = action.payload
        },
        removeAccessToken: (state) => {
            state.accessToken = null
            removeAccessTokenUser()
        },
        setReadNotificationsUser: (state) => {
            state.unreadCount = 0
        },
        setPopup: (state, action: PayloadAction<PopupEnum>) => {
            state.popup = action.payload
        },
        setIsLoaded: (state, action: PayloadAction<boolean>) => {
            state.isLoaded = action.payload
        },
        setIsFeedbackModal: (state, action: PayloadAction<boolean>) => {
            state.isFeedbackModal = action.payload
        },
    }
})

export default userSlice.reducer
