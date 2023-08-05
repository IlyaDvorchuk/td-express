import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import Header from "../components/headers/header/Header";
import {useNavigate} from "react-router-dom";
import {isObjectEmpty} from "../utils/isObjectEmpty";
import HeaderAdmin from "../components/headers/header-admin/HeaderAdmin";
import {ADMIN_SCREEN} from "../models/enums";
import ModerationSeller from "../components/admin-screens/moderation-seller/ModerationSeller";


const Admin = () => {
    const navigation = useNavigate()
    const {user} = useAppSelector((state) => state.userReducer);
    const [currentScreen, setCurrentScreen] = useState(ADMIN_SCREEN.GENERAL)

    useEffect(() => {
        if (!isObjectEmpty(user)) {
            if (!(user.role === 'ADMIN' && user.email === 'tabakevgenijj@gmail.com')) {
                navigation('/')
            }
        }

    }, [navigation, user])

    return (
        <div>
            <div style={{display: 'none'}}>
                <Header/>
            </div>
            <HeaderAdmin setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>
            {currentScreen === ADMIN_SCREEN.MODERATION_SELLERS && <ModerationSeller/>}
        </div>
    );
};

export default Admin;