import React, {useEffect} from 'react';
import './popup.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {PopupEnum} from "../../models/enums";
import {userSlice} from "../../store/reducers/user/UserSlice";

const Popup = () => {
    const dispatch = useAppDispatch()
    const {popup, } = useAppSelector(state => state.userReducer)
    const {setPopup, changeIsUserModal} = userSlice.actions

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (popup !== PopupEnum.DEFAULT) {
                dispatch(setPopup(PopupEnum.DEFAULT));
            }
        }, 5000);

        // Очищаем таймер при размонтировании компонента или при следующем изменении popup
        return () => clearTimeout(timeoutId);
    }, [dispatch, setPopup, popup])
    ;
    const openUserModal = () => dispatch(changeIsUserModal(true))

    return (
        <div className={`popup ${popup !== PopupEnum.DEFAULT ? 'active' : ''}`}>
            {popup === PopupEnum.ADD_CART && <p>
                Товар добавлен в корзину
            </p>}
            {popup === PopupEnum.ADD_CART_NOT_USER && <>
                <p>
                Товар добавлен в корзину
                </p>
                <p>
                    Чтобы сохранить добавленные товары в аккаунте, <span className={'popup__link'} onClick={openUserModal}>войдите</span> или <span className={'popup__link'} onClick={openUserModal}>зарегистрируйтесь</span>
                </p>
            </>}
            {popup === PopupEnum.ADD_FAVORITE && <p className={'sss'}>
                Товар добавлен в избранное
            </p>}
            {popup === PopupEnum.ADD_FAVORITE_NOT_USER && <>
                <p>
                    Товар добавлен в избранное
                </p>
                <br/>

                <p>
                    Чтобы сохранить добавленные товары в аккаунте, <span className={'popup__link'} onClick={openUserModal}>войдите</span> или <span className={'popup__link'} onClick={openUserModal}>зарегистрируйтесь</span>
                </p>
            </>}
        </div>
    );
};

export default Popup;
