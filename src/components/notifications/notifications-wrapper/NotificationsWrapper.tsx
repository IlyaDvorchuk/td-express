import React, { useState} from 'react';
import './notifications-wrapper.scss'
import NotificationSvg from "../../svg/NotificationSvg";
import NotificationCard from "../notification-card/NotificationCard";
import {useAppSelector} from "../../../hooks/redux";
import {INotification} from "../../../models/INotification";
import {useWindowWidth} from "../../../hooks/useWindowWidth";

interface IPropsNotificationsWrapper {
    notifications: INotification[],
    setRemoveNotifications: React.Dispatch<React.SetStateAction<string[]>>,
    isSeller?: boolean
    setIsCover?: () => void
}

const NotificationsWrapper = ({notifications, setRemoveNotifications, isSeller = false, setIsCover = () => {}}: IPropsNotificationsWrapper) => {
    const {unreadCount} = useAppSelector(state => state.shelterReducer)
    const [activeNotification, setActiveNotification] = useState(0)
    const windowWidth = useWindowWidth()

    return (
        <div className={'notifications'}>
            <div className={'notifications__tabs'}>
                {windowWidth < 600 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      onClick={setIsCover}>
                    <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702M20.5 12.0002H3.67" stroke="#8554EA" strokeWidth="2"
                          strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
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
                {/*{*/}
                {/*    isSeller && <>*/}
                {/*        <div*/}
                {/*            className={`notifications-item ${activeNotification === 1 && 'active'}`}*/}
                {/*            onClick={() => setActiveNotification(1)}*/}
                {/*        >*/}
                {/*            <div>*/}
                {/*                <TechnicalSupportSvg/>*/}
                {/*            </div>*/}
                {/*            <span className={'notifications-item__text'}>*/}
                {/*                Общение<br/>с покупателем*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div*/}
                {/*            className={`notifications-item ${activeNotification === 2 && 'active'}`}*/}
                {/*            onClick={() => setActiveNotification(2)}*/}
                {/*        >*/}
                {/*            <div>*/}
                {/*                <CommunicationSvg/>*/}
                {/*            </div>*/}
                {/*            <span className={'notifications-item__text'}>*/}
                {/*                Общение<br/>с тех.поддержкой*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*}*/}
            </div>
            <div className={'notifications-wrapper'}>
                {notifications.map(notification => (
                    <NotificationCard
                        notification={notification}
                        key={notification._id}
                        setRemoveNotifications={setRemoveNotifications}/>
                ))}
            </div>
        </div>
    );
};

export default NotificationsWrapper;
