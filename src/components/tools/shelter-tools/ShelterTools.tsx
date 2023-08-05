import React, {useEffect, useState} from 'react';
import './shelter-tools.scss'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Cover from "../../cover/Cover";
import NotificationSvg from "../../svg/NotificationSvg";
import TechnicalSupportSvg from "../../svg/TechnicalSupportSvg";
import CommunicationSvg from "../../svg/CommunicationSvg";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import {API_URL} from "../../../http";
import ModalLogin from "../../modals/modal-login/ModalLogin";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {sendCodeShelter} from "../../../store/reducers/shelter/ShelterCreator";
import {ShelterService} from "../../../services/ShelterService";
import {INotification} from "../../../models/INotification";
import NotificationCard from "../../notifications/NotificationCard";

const ShelterTools = () => {
    const navigation = useNavigate()
    const dispatch = useAppDispatch()
    const {isUserModal} = useAppSelector(state => state.userReducer)
    const {shelter, isHoverTools, unreadCount} = useAppSelector(state => state.shelterReducer)
    const {setLogoutSuccess, setReadNotifications} = shelterSlice.actions
    const {changeIsUserModal} = userSlice.actions
    const [isCover, setIsCover] = useState(false)
    const [activeNotification, setActiveNotification] = useState(0)
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [removeNotifications, setRemoveNotifications] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isCover && removeNotifications.length > 0) {
                    const response = await ShelterService.deleteNotificationsOfShelter(removeNotifications)
                    if (response.data) setRemoveNotifications([])
                }
            } catch (error) {
                console.error('Ошибка при удалении уведомлений:', error);
            }
        };

        fetchData();
    }, [removeNotifications, isCover]);

    const onMouseLeave = () => {
        if (!isCover) dispatch(shelterSlice.actions.setIsHoverTools(false))
    }


    const onClose = () => {
        dispatch(shelterSlice.actions.setIsHoverTools(false))
        setIsCover(false)
    }

    const onClickNotifications = async () => {
        setIsCover(true)
        const response = await ShelterService.getNotificationsOfShelter()
        setNotifications(response.data)
        const readNotifications = await ShelterService.readNotificationsOfShelter()
        if (readNotifications.data) {
            dispatch(setReadNotifications)
        }
    }

    const onPersonalData = () => {
        navigation(`/personal-data/${shelter._id}`, {
            state: {
                ...shelter
            }
        })
    }

    const onShopData = () => {
        navigation(`/shop-data/${shelter._id}`, {
            state: {
                ...shelter
            }
        })
    }

    const onLogout = () => {
        dispatch(shelterSlice.actions.removeAccessToken())
        dispatch(setLogoutSuccess())
        navigation('/')
    }

    const createNewPassword = () => {
        dispatch(changeIsUserModal(true))
        dispatch(sendCodeShelter(shelter.email, true))
    }

    return (
        <>
            <div className={`shelter-tools ${isHoverTools && 'active-tools'} ${isCover && 'notifications'}`} onMouseLeave={onMouseLeave}>
                <div className={'shelter-tools__header'}>
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
                    <div className={'shelter-tools__name'}>
                        <p className={'name-market'}>
                            {shelter?.shop?.nameMarket}
                        </p>
                        <p className={'isIndividual-name'}>
                            {(shelter?.shelterData?.entity.isIndividual ? 'ИП ' : 'Ю.л ') + shelter?.name}
                        </p>
                    </div>
                    {shelter.imageShop && <div
                        className={'shelter-icon'}
                        onMouseEnter={() => dispatch(shelterSlice.actions.setIsHoverTools(true))}
                    >
                        <img src={`${API_URL}${shelter?.imageShop}`} alt="Иконка продавца"/>
                    </div>}
                </div>
                {!isCover && <div className={'shelter-tools__buttons'}>
                    <div className={'shelter-link'} onClick={onClickNotifications}>
                        <img src="/images/svg/bell.svg" alt="Уведомления"/>
                        <span>Уведомления</span>
                        {unreadCount > 0 && <div className={'unread'}/>}
                    </div>
                    <div className={'shelter-link'} onClick={onPersonalData}>
                        <img src="/images/svg/personal-data.svg" alt="Личные данные"/>
                        <span>Личные данные</span>
                    </div>
                    <div className={'shelter-link'} onClick={onShopData}>
                        <img src="/images/svg/shop-data.svg" alt="Данные магазина"/>
                        <span>Данные магазина</span>
                    </div>
                    <div className={'shelter-link'} onClick={createNewPassword}>
                        <img src="/images/svg/key.svg" alt="Смена пароля"/>
                        <span>Смена пароля</span>
                    </div>
                    <div className={'shelter-link'} onClick={onLogout}>
                        <img src="/images/svg/logout.svg" alt="Выйти"/>
                        <span>Выйти</span>
                    </div>
                </div>}
                {isCover &&
                    <>
                        <div className={'notifications__tabs'}>
                            <div
                                className={`notifications-item ${activeNotification === 0 && 'active'}`}
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

                }
            </div>
            {isUserModal && <ModalLogin observableModal={1} isShelter={true} forgotPassword={true}/>}
            {isCover && <Cover callback={onClose}/>}

        </>
    );
};

export default ShelterTools;
