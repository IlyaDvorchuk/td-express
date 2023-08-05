import React from 'react';
import './header-admin.scss'
import {ADMIN_SCREEN} from "../../../models/enums";

interface IProps {
    currentScreen: ADMIN_SCREEN,
    setCurrentScreen : React.Dispatch<React.SetStateAction<ADMIN_SCREEN>>,
}
const HeaderAdmin = ({currentScreen , setCurrentScreen}: IProps) => {
    return (
        <div className={'header-admin'}>
            <p className={'header-admin__logo'}>
                Панель администратора
            </p>
            <div className={'header-admin__links'}>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.GENERAL)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.GENERAL ? 800 : 400}}>
                    Главная
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_AD)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_AD ? 800 : 400}}>
                    Модерация объявлений
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_SELLERS)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_SELLERS ? 800 : 400}}>
                    Модерация регистрируемых продавцов
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.PRODUCT_LIST)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.PRODUCT_LIST ? 800 : 400}}>
                    Список товаров доставляемых товаров
                </div>
            </div>
        </div>
    );
};

export default HeaderAdmin;