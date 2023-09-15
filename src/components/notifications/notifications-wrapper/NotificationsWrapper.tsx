import React, {useState} from 'react';
import './notifications-wrapper.scss'
import NotificationSvg from "../../svg/NotificationSvg";
import TechnicalSupportSvg from "../../svg/TechnicalSupportSvg";
import CommunicationSvg from "../../svg/CommunicationSvg";
import NotificationCard from "../notification-card/NotificationCard";
import {useAppSelector} from "../../../hooks/redux";
import {INotification} from "../../../models/INotification";

interface IPropsNotificationsWrapper {
    notifications: INotification[],
    setRemoveNotifications: React.Dispatch<React.SetStateAction<string[]>>,
    isSeller?: boolean
}

const NotificationsWrapper = ({notifications, setRemoveNotifications, isSeller = false}: IPropsNotificationsWrapper) => {
    const {unreadCount} = useAppSelector(state => state.shelterReducer)
    const [activeNotification, setActiveNotification] = useState(0)

    return (
        <>
            <div className={'notifications__tabs'}>
                <div
                    className={`notifications-item ${activeNotification === 0 && 'active'} ${!isSeller && 'user'}`}
                    onClick={() => setActiveNotification(0)}
                >
                    <div>
                        <NotificationSvg/>
                    </div>
                    <span className={'notifications-item__text'}>
                                Уведомления<br/>от td-market
                            </span>
                    {unreadCount > 0 && <div className={'unread'}/>}
                </div>
                {
                    isSeller && <>
                        <div
                            className={`notifications-item ${activeNotification === 1 && 'active'}`}
                            onClick={() => setActiveNotification(1)}
                        >
                            <div>
                                <TechnicalSupportSvg/>
                            </div>
                            <span className={'notifications-item__text'}>
                                Общение<br/>с покупателем
                            </span>
                        </div>
                        <div
                            className={`notifications-item ${activeNotification === 2 && 'active'}`}
                            onClick={() => setActiveNotification(2)}
                        >
                            <div>
                                <CommunicationSvg/>
                            </div>
                            <span className={'notifications-item__text'}>
                                Общение<br/>с тех.поддержкой
                            </span>
                        </div>
                    </>
                }
            </div>
            <div className={'notifications-wrapper'}>
                {notifications.map(notification => (
                    <NotificationCard
                        notification={notification}
                        key={notification._id}
                        setRemoveNotifications={setRemoveNotifications}/>
                ))}
            </div>
        </>
    );
};

export default NotificationsWrapper;