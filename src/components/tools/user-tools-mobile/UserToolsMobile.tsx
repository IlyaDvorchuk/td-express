import React from 'react';
import './user-tools-mobile.scss'
import '../../../styles/elements/tools.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Link, useNavigate} from "react-router-dom";
import {userSlice} from "../../../store/reducers/user/UserSlice";

const UserToolsMobile = ({isPressed}: {isPressed: boolean}) => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)

    const onLogout = () => {
        dispatch(userSlice.actions.removeAccessToken())
        window.location.reload()
        navigation('/')

    }

    return (
        <div className={`user-tools-mobile  ${isPressed && 'active'}`}>
            <div className={'user-tools-mobile__header'}>
                <div
                    className={'user-icon'}
                >
                    <span>
                        {`${user.firstName?.toUpperCase()[0]}`}
                    </span>
                    <span>
                        {`${user.secondName?.toUpperCase()[0]}`}
                    </span>
                </div>
                <div className={'user-tools-name'}>
                    <p className={'name-user name-user_mobile'}>
                        {user?.firstName} {user?.secondName}
                    </p>
                    <p className={'email-user'}>
                        {user.email}
                    </p>
                </div>
            </div>
            <div className={'tools-buttons user-tools-mobile__buttons'}>
                <Link className={'tools-link'} to={'/orders'}>
                    <img src="/images/svg/my-orders.svg" alt="Личные данные"/>
                    <span>Мои заказы</span>
                </Link>
                <div className={'tools-link'}>
                    <img src="/images/svg/bell.svg" alt="Уведомления"/>
                    <span>Уведомления</span>
                </div>
                <Link className={'tools-link'} to={'/'}>
                    <img src="/images/svg/key.svg" alt="Смена пароля"/>
                    <span>Смена пароля</span>
                </Link>
                <div className={'tools-link'}  onClick={onLogout}>
                    <img src="/images/svg/logout.svg" alt="Выйти"/>
                    <span>Выйти</span>
                </div>
            </div>

        </div>
    );
};

export default UserToolsMobile;
