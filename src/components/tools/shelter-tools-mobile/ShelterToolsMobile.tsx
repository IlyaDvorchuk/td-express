import React, {useEffect, useState} from 'react';
import './shelter-tools-mobile.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import {API_URL} from "../../../http";
import {useNavigate} from "react-router-dom";
import {ShelterService} from "../../../services/ShelterService";
import {INotification} from "../../../models/INotification";
import NotificationsWrapper from "../../notifications/notifications-wrapper/NotificationsWrapper";

const ShelterToolsMobile = ({isPressed}: {isPressed: boolean}) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const {shelter, unreadCount} = useAppSelector(state => state.shelterReducer)
    const {setReadNotifications} = shelterSlice.actions
    const [isCover, setIsCover] = useState(false)
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

    const onLogout = () => {
        dispatch(userSlice.actions.removeAccessToken())
    }

    const onPersonalData = () => {
        navigation(`/personal-data/${shelter._id}`, {
            state: {
                ...shelter
            }
        })
    }

    const onClickNotifications = async () => {
        setIsCover(true)
        const response = await ShelterService.getNotificationsOfShelter()
        setNotifications(response.data.reverse())
        const readNotifications = await ShelterService.readNotificationsOfShelter()
        if (readNotifications.data) {
            dispatch(setReadNotifications)
        }
    }

    return (
        <div className={`shelter-tools-mobile  ${isPressed && 'active'}`}>
            <div className={'shelter-tools-mobile__header'}>
                <div
                    className={'shelter-icon'}
                    onMouseEnter={() => dispatch(shelterSlice.actions.setIsHoverTools(true))}
                >
                    <img src={`${API_URL}${shelter?.imageShop}`} alt="Иконка продавца"/>
                </div>
                <div className={'shelter-tools__name'}>
                    <p className={'name-market'}>
                        {shelter?.shop?.nameMarket}
                    </p>
                    <p className={'isIndividual-name'}>
                        {(shelter?.shelterData?.entity.isIndividual ? 'ИП ' : 'Ю.л ') + shelter?.name}
                    </p>
                </div>
            </div>
            <div className={'tools-buttons shelter-tools-mobile__buttons'}>
                <div className={'tools-link'} onClick={onClickNotifications}>
                    <img src="/images/svg/bell.svg" alt="Уведомления"/>
                    <span>Уведомления</span>
                    {unreadCount > 0 && <div className={'unread'}/>}
                </div>
                <div className={'tools-link'} onClick={onPersonalData}>
                    <img src="/images/svg/personal-data.svg" alt="Личные данные"/>
                    <span>Личные данные</span>
                </div>
                <div className={'tools-link'}>
                    <img src="/images/svg/key.svg" alt="Смена пароля"/>
                    <span>Смена пароля</span>
                </div>
                <div className={'tools-link'} onClick={onLogout}>
                    <img src="/images/svg/logout.svg" alt="Выйти"/>
                    <span>Выйти</span>
                </div>
            </div>
            {isCover && <NotificationsWrapper
                notifications={notifications}
                setRemoveNotifications={setRemoveNotifications}
                isSeller={true}
            />}
        </div>
    );
};

export default ShelterToolsMobile;