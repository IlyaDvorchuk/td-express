import React from 'react';
import './user-tools.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {Link} from "react-router-dom";
import '../../../styles/elements/tools.scss'

const UserTools = () => {
    const dispatch = useAppDispatch()
    const {user, isHoverTools} = useAppSelector(state => state.userReducer)
    const onMouseLeave = () => {
        dispatch(userSlice.actions.setIsHoverTools(false))
    }

    const onLogout = () => {
        dispatch(userSlice.actions.removeAccessToken())
    }
    return (
        <div className={`user-tools ${isHoverTools && 'active-tools'}`} onMouseLeave={onMouseLeave}>
            <div className={'user-tools__header'}>
                <div className={'user-tools-name'}>
                    <p className={'name-user'}>
                        {user?.firstName} {user?.secondName}
                    </p>
                    <p className={'email-user'}>
                        {user.email}
                    </p>
                </div>
                <div
                    className={'user-icon little'}
                    onMouseEnter={() => dispatch(userSlice.actions.setIsHoverTools(true))}
                >
                    <span>
                        {`${user.firstName?.toUpperCase()[0]}`}
                    </span>
                    <span>
                        {`${user.secondName?.toUpperCase()[0]}`}
                    </span>
                </div>

            </div>
            <div className={'shelter-tools__buttons'}>
                <Link className={'shelter-link'} to={'/'}>
                    <img src="/images/svg/my-orders.svg" alt="Личные данные"/>
                    <span>Мои заказы</span>
                </Link>
                <div className={'shelter-link'}>
                    <img src="/images/svg/bell.svg" alt="Уведомления"/>
                    <span>Уведомления</span>
                </div>
                <Link className={'shelter-link'} to={'/'}>
                    <img src="/images/svg/key.svg" alt="Смена пароля"/>
                    <span>Смена пароля</span>
                </Link>
                <div className={'shelter-link'} onClick={onLogout}>
                    <img src="/images/svg/logout.svg" alt="Выйти"/>
                    <span>Выйти</span>
                </div>
            </div>
        </div>
    );
};

export default UserTools;
