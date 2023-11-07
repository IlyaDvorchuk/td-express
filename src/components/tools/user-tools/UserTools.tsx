import React, {useEffect, useState} from 'react';
import './user-tools.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {Link} from "react-router-dom";
import '../../../styles/elements/tools.scss'
import {UserService} from "../../../services/UserService";
import {INotification} from "../../../models/INotification";
import NotificationsWrapper from "../../notifications/notifications-wrapper/NotificationsWrapper";
import Cover from "../../cover/Cover";

const UserTools = () => {
    const dispatch = useAppDispatch()
    const {user, isHoverTools, unreadCount} = useAppSelector(state => state.userReducer)
    const [isCover, setIsCover] = useState(false)
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [removeNotifications, setRemoveNotifications] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isCover && removeNotifications.length > 0) {
                    const response = await UserService.deleteNotificationsOfUser(removeNotifications)
                    if (response.data) setRemoveNotifications([])
                }
            } catch (error) {
                console.error('Ошибка при удалении уведомлений:', error);
            }
        };

        fetchData();
    }, [removeNotifications, isCover]);

    const onMouseLeave = () => {
        if (!isCover) dispatch(userSlice.actions.setIsHoverTools(false))
    }

    const onLogout = () => {
        dispatch(userSlice.actions.removeAccessToken())
    }

    const onClose = () => {
        setIsCover(false)
    }

    const onClickNotifications = async () => {
        setIsCover(true)
        const response = await UserService.getNotificationsOfUser()
        setNotifications(response.data.reverse())
        const readNotifications = await UserService.readNotificationsOfUser()
        if (readNotifications.data) {
            dispatch(userSlice.actions.setReadNotificationsUser)
        }
    }

    return (
        <>
            <div className={`user-tools ${isHoverTools && 'active-tools'} ${isCover && 'notifications'}`} onMouseLeave={onMouseLeave}>
                <div className={'user-tools__header'}>
                    {
                        isCover &&
                        <div className={'notifications__header'}>
                            <img src="/images/svg/close.svg" alt="Закрыть уведомления" onClick={onClose}/>
                            <div className={'shelter-link'} onClick={onClickNotifications}>
                                <img src="/images/svg/bell.svg" alt="Уведомления"/>
                                <span>Уведомления</span>
                                {unreadCount > 0 && <div className={'unread'}/>}
                            </div>
                        </div>
                    }
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
                {!isCover && <div className={'shelter-tools__buttons'}>
                    <Link className={'shelter-link'} to={'/orders'}>
                        <img src="/images/svg/my-orders.svg" alt="Личные данные"/>
                        <span>Мои заказы</span>
                    </Link>
                    <div className={'shelter-link'} onClick={onClickNotifications}>
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
                </div>}
                {isCover && <NotificationsWrapper notifications={notifications} setRemoveNotifications={setRemoveNotifications}/>}
            </div>
            {isCover && <Cover callback={onClose} zIndex={1}/>}
        </>

    );
};

export default UserTools;
