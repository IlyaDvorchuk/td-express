import React from 'react';
import './shelter-tools-mobile.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import {API_URL} from "../../../http";

const ShelterToolsMobile = ({isPressed}: {isPressed: boolean}) => {
    const dispatch = useAppDispatch()
    const {shelter, unreadCount} = useAppSelector(state => state.shelterReducer)

    const onLogout = () => {
        dispatch(userSlice.actions.removeAccessToken())
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
                <div className={'tools-link'}>
                    <img src="/images/svg/bell.svg" alt="Уведомления"/>
                    <span>Уведомления</span>
                    {unreadCount > 0 && <div className={'unread'}/>}
                </div>
                <div className={'tools-link'}>
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

        </div>
    );
};

export default ShelterToolsMobile;