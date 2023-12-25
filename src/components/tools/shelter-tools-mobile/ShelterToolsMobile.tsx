import React, {useEffect, useState} from 'react';
import './shelter-tools-mobile.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import {API_URL} from "../../../http";
import {Link, useNavigate} from "react-router-dom";
import {ShelterService} from "../../../services/ShelterService";
import {INotification} from "../../../models/INotification";
import NotificationsWrapper from "../../notifications/notifications-wrapper/NotificationsWrapper";

const ShelterToolsMobile = ({isPressed}: {isPressed: boolean}) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const {shelter, unreadCount} = useAppSelector(state => state.shelterReducer)
    const {setReadNotifications, setLogoutSuccess} = shelterSlice.actions
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
        dispatch(shelterSlice.actions.removeAccessToken())
        dispatch(setLogoutSuccess())
        navigation('/')
    }


    const onPersonalData = () => {
        console.log('ShelterToolsMobile 43')
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
                <div className={'shelter-tools-mobile__item'}>
                    <div className={'tools-link'} onClick={onClickNotifications}>
                        <img src="/images/svg/bell.svg" alt="Уведомления"/>
                        <span>Уведомления</span>
                        {unreadCount > 0 && <div className={'unread'}/>}
                    </div>
                </div>
                <div className={'shelter-tools-mobile__item'}>
                    <div className={'tools-link'} onClick={onPersonalData}>
                        <img src="/images/svg/personal-data.svg" alt="Личные данные"/>
                        <span>Личные данные</span>
                    </div>
                    <div className={'tools-link'} onClick={onShopData}>
                        <img src="/images/svg/shop-data.svg" alt="Личные данные"/>
                        <span>Данные магазина </span>
                    </div>
                    <div className={'tools-link'}>
                        <img src="/images/svg/key.svg" alt="Смена пароля"/>
                        <span>Смена пароля</span>
                    </div>
                </div>
                <div className={'shelter-tools-mobile__item'}>
                    <Link to={'/seller/delivery'} className={'tools-link'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 6.90432C1.5 4.85993 2.76752 3.15101 4.51136 2.53138C4.32903 2.8841 4.45372 3.32161 4.80073 3.52351C5.15876 3.73182 5.61786 3.61045 5.82617 3.25242L6.60756 1.9094C6.74254 1.67741 6.74326 1.39098 6.60945 1.15831C6.47564 0.92565 6.2277 0.782227 5.9593 0.782227C2.6435 0.782227 0 3.54203 0 6.90432C0 7.31853 0.335786 7.65432 0.75 7.65432C1.16421 7.65432 1.5 7.31853 1.5 6.90432ZM16.3837 11.509C16.3837 11.0948 16.0479 10.759 15.6337 10.759C15.2195 10.759 14.8837 11.0948 14.8837 11.509C14.8837 13.5534 13.6162 15.2623 11.8724 15.8819C12.0547 15.5292 11.93 15.0917 11.583 14.8898C11.225 14.6815 10.7659 14.8028 10.5576 15.1609L9.77616 16.5039C9.64118 16.7359 9.64046 17.0223 9.77427 17.255C9.90808 17.4876 10.156 17.6311 10.4244 17.6311C13.7402 17.6311 16.3837 14.8713 16.3837 11.509ZM9.94713 5.95268V4.5776L11.6694 5.60398V7.36998L10.306 6.59081L10.306 6.5908L10.3016 6.5883C10.2463 6.55724 10.1496 6.46937 10.0641 6.31886C9.97923 6.16958 9.94713 6.03172 9.94713 5.95268ZM14.5248 6.59121L13.1694 7.36579V5.60244L14.8843 4.57455V5.95268C14.8843 6.0284 14.8524 6.16536 14.7657 6.3169C14.6784 6.4694 14.5799 6.55959 14.5248 6.59116L14.5248 6.59121ZM12.742 2.34604L14.2484 3.2069L12.4181 4.30398L10.58 3.20862L12.0867 2.34764C12.1433 2.31715 12.262 2.28223 12.4185 2.28223C12.5774 2.28223 12.6922 2.31813 12.7412 2.34559L12.742 2.34604ZM12.4185 0.782227C12.7629 0.782227 13.1501 0.853366 13.4811 1.04074L13.4837 1.04221L15.2678 2.06179C15.6206 2.26105 15.8914 2.57917 16.0715 2.89604C16.2527 3.21489 16.3843 3.60657 16.3843 4.00335V5.95268C16.3843 6.35278 16.2488 6.74535 16.0676 7.06195C15.887 7.3775 15.6173 7.69404 15.2704 7.89274L15.2697 7.89314L13.4855 8.91284L13.4845 8.91336C13.1511 9.10484 12.7617 9.17961 12.4129 9.17961C12.066 9.17961 11.6768 9.10558 11.3447 8.91207L9.56368 7.89426C9.21082 7.695 8.94003 7.37687 8.75995 7.05999C8.57874 6.74113 8.44713 6.34946 8.44713 5.95268V4.00335C8.44713 3.60326 8.58267 3.21069 8.76385 2.89409C8.94444 2.57853 9.21419 2.262 9.56103 2.06329L9.56174 2.06288L11.3478 1.04222L11.3558 1.03765L11.3558 1.0377C11.6873 0.85363 12.0734 0.782227 12.4185 0.782227ZM1.5 13.0206V14.394C1.5 14.4731 1.5321 14.6109 1.61694 14.7602C1.70248 14.9107 1.79922 14.9986 1.85444 15.0296L1.85889 15.0321L1.85888 15.0322L3.21434 15.8068V14.0449L1.5 13.0206ZM4.71434 15.8117L6.07763 15.0326L6.07786 15.0324C6.13292 15.0008 6.23139 14.9106 6.31859 14.7582C6.40531 14.6067 6.4372 14.4697 6.4372 14.394V13.0149L4.71434 14.045V15.8117ZM5.80065 11.6479L4.29768 10.789C4.24107 10.7585 4.12238 10.7236 3.96581 10.7236C3.8069 10.7236 3.69216 10.7595 3.64311 10.7869L2.13163 11.6507L3.96442 12.7457L5.80065 11.6479ZM5.02851 9.47903C4.69703 9.29497 4.31095 9.22356 3.96581 9.22356C3.62141 9.22356 3.23421 9.2947 2.90327 9.48207L2.90067 9.48356L1.11462 10.5042L1.11391 10.5046C0.76708 10.7033 0.497323 11.0199 0.316735 11.3354C0.135548 11.652 0 12.0446 0 12.4447V14.394C0 14.7908 0.131619 15.1825 0.31283 15.5013C0.492914 15.8182 0.763697 16.1363 1.11655 16.3356L2.89754 17.3534C3.22969 17.5469 3.61885 17.6209 3.96581 17.6209C4.31463 17.6209 4.70404 17.5462 5.03746 17.3547L5.03833 17.3542L6.8226 16.3345L6.8233 16.3341C7.17014 16.1354 7.43989 15.8188 7.62048 15.5033C7.80166 15.1867 7.9372 14.7941 7.9372 14.394V12.4447C7.9372 12.0479 7.80559 11.6562 7.62438 11.3374C7.4443 11.0205 7.17353 10.7024 6.82067 10.5031L5.03654 9.48355L5.03656 9.48351L5.02851 9.47903Z" fill="#6F6E71"/>
                        </svg>
                        <span>Стоимость доставки</span>
                    </Link>
                    <Link to={'/seller/subscription'} className={'tools-link'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <path d="M6.42773 12.1682L11.3327 7.26318" stroke="#6F6E71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.73501 8.49343C7.24449 8.49343 7.65749 8.08043 7.65749 7.57095C7.65749 7.06146 7.24449 6.64844 6.73501 6.64844C6.22553 6.64844 5.8125 7.06146 5.8125 7.57095C5.8125 8.08043 6.22553 8.49343 6.73501 8.49343Z" stroke="#6F6E71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.64 12.7835C12.1495 12.7835 12.5625 12.3704 12.5625 11.861C12.5625 11.3515 12.1495 10.9385 11.64 10.9385C11.1305 10.9385 10.7175 11.3515 10.7175 11.861C10.7175 12.3704 11.1305 12.7835 11.64 12.7835Z" stroke="#6F6E71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 17.2158C13.1421 17.2158 16.5 13.858 16.5 9.71582C16.5 5.57368 13.1421 2.21582 9 2.21582C4.85786 2.21582 1.5 5.57368 1.5 9.71582C1.5 13.858 4.85786 17.2158 9 17.2158Z" stroke="#6F6E71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Тарифные планы</span>
                    </Link>
                </div>
                <div className={'shelter-tools-mobile__item'}>
                    <div className={'tools-link'} onClick={onLogout}>
                        <img src="/images/svg/logout.svg" alt="Выйти"/>
                        <span>Выйти</span>
                    </div>
                </div>
            </div>
            {isCover && <NotificationsWrapper
                notifications={notifications}
                setRemoveNotifications={setRemoveNotifications}
                isSeller={true}
                setIsCover={() => setIsCover(false)}
            />}
        </div>
    );
};

export default ShelterToolsMobile;
