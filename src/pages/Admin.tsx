import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import Header from "../components/headers/header/Header";
import {useNavigate} from "react-router-dom";
import {isObjectEmpty} from "../utils/isObjectEmpty";
import HeaderAdmin from "../components/headers/header-admin/HeaderAdmin";
import {ADMIN_SCREEN} from "../models/enums";
import ModerationSeller from "../components/admin-screens/moderation-seller/ModerationSeller";
import ModerationGood from "../components/admin-screens/moderation-good/ModerationGood";
import AdminDelivery from "../components/admin-screens/admin-delivery/AdminDelivery";


const Admin = () => {
    const navigation = useNavigate()
    const {user} = useAppSelector((state) => state.userReducer);
    const [currentScreen, setCurrentScreen] = useState(ADMIN_SCREEN.GENERAL)
    const [isFirstLoading, setIsFirstLoading] = useState(false)

    useEffect(() => {
        if (isFirstLoading) {
            console.log('user', user)
            if (!isObjectEmpty(user)) {

                if (!(user.role === 'ADMIN' || user.email === 'tabakevgenijj@gmail.com')) {
                    navigation('/')
                }
            } else navigation('/')
        }

        setIsFirstLoading(true)
    }, [user])

    return (
        <div>
            <div style={{display: 'none'}}>
                <Header/>
            </div>
            <HeaderAdmin setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>
            {currentScreen === ADMIN_SCREEN.MODERATION_AD && <ModerationGood/>}
            {currentScreen === ADMIN_SCREEN.MODERATION_SELLERS && <ModerationSeller/>}
            {currentScreen === ADMIN_SCREEN.PRODUCT_LIST && <AdminDelivery/>}
        </div>
    );
};

export default Admin;