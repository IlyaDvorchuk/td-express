import React, {MouseEventHandler, useMemo, useState} from 'react';
import './order-card-mobile.scss'
import {IOrderRes} from "../../../models/IOrder";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";
import classNames from "classnames";
import {OrderEnum} from "../../../models/enums";
import {formatDate} from "../../../utils/formatDate";
import {ShelterService} from "../../../services/ShelterService";
import {AdminService} from "../../../services/AdminService";

interface IProps {
    order: IOrderRes,
}


const OrderCardMobile = ({order}: IProps) => {
    const [status, setStatus] = useState<OrderEnum>(order.status)
    const [isActive, setIsActive] = useState(false)
    const typeGoodArray = useTypeGoodArray(order);

    const dateOrder = useMemo(() => {
        return formatDate(order.createdAt)
    }, [order.createdAt])

    const onChangeStatus = async (status: OrderEnum) => {
        let newStatus: OrderEnum
        let text;
        if (status === OrderEnum.AWAITING_CONFIRMATION) {
            newStatus = OrderEnum.AWAITING_SHIPMENT
            text = `Ваш товар <b>${order.goodName}</b> ожидает отправки`
        } else if (status === OrderEnum.AWAITING_SHIPMENT) {
            newStatus = OrderEnum.DELIVERY
            text = `Ваш товар  <b>${order.goodName}</b> доставляется`
        } else if (status === OrderEnum.DELIVERY) {
            newStatus = OrderEnum.COMPLETED
            text = `Ваш товар <b>${order.goodName}</b> доставлен`
        } else return
        const response = await ShelterService.changeStatus(order._id, newStatus)
        if (order.userId) {
            console.log('order.userId', order.userId)
            await AdminService.createNotification(order.userId, text, true)
        }
        if (response.data) {
            order.status = newStatus
            setStatus(newStatus)
        }
    }

    const onClickCard: MouseEventHandler<HTMLDivElement> = (e) => {
        const elem = e.target as HTMLElement
        if (elem.classList.contains('order-card__button')) {
            return
        }
        setIsActive(!isActive)
    }

    return (
        <div className={'order-card-mobile'} onClick={onClickCard}>
            <div className={'order-card-mobile__visible'}>
                <div className={'order-card-mobile__image'}>
                    <img src={`https://api.td-market.md/${order.goodPhoto}`} alt={order.goodName}/>
                </div>
                <div>
                    <h2 className={'order-card-mobile__title'}>
                        {order.goodName}
                    </h2>
                    <p className={'order-card-mobile__title order-card-mobile__price'}>
                        {order.price + (order?.deliveryAddress?.deliveryPrice || 0)} Руб.
                    </p>
                    <p className={'order-card-mobile__types'}>
                        {typeGoodArray.map((item, index) => (
                            <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                        ))}
                    </p>
                    <div className={'order-card-mobile__types order-card-mobile__count'}>
                        {order.count} шт.
                    </div>
                    <p className={'order-card-mobile__delivery'}>
                        {order.deliveryMethod === 'pickup' && 'Самовывоз'}
                        {order.deliveryMethod === 'express' && 'Экспресс-почтой'}
                        {order.deliveryMethod === 'doorstep' && 'Курьером'}
                    </p>
                </div>
                <div className={'order-card-mobile__right'}>
                    <div className={'order-card__status'}>
                        <div className={classNames('status-mobile status_back', {
                            'status-mobile_green': status === OrderEnum.COMPLETED,
                            'status-mobile_yellow': status === OrderEnum.AWAITING_CONFIRMATION || status === OrderEnum.AWAITING_SHIPMENT,
                            'status-mobile_violet': status === OrderEnum.DELIVERY,
                        })}>
                            <img src={`/images/svg/status/order/${status}.svg`} alt="Удаление товаров"/>
                            <span>
                            {status}
                        </span>
                        </div>

                    </div>
                    <svg className={`order-card-mobile__arrow ${isActive ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.07998 8.90991L10.6 15.4299C11.37 16.1999 12.63 16.1999 13.4 15.4299L19.92 8.90991" stroke="#6F6E71" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className={`order-card-mobile__hidden ${isActive ? 'active' : ''}`}>
                <div className={'order-card-mobile__add-inf'}>
                        {order.deliveryMethod === 'doorstep' && <div>
                            <h4>Адрес доставки</h4>
                            <p>
                                г. {order.city}
                            </p>
                            <p>
                                {`ул. ${order?.deliveryAddress?.street},
                        д. ${order?.deliveryAddress?.house}

                        ${order?.deliveryAddress?.apartment ? 'кв. ' + order?.deliveryAddress?.apartment : ''}`}
                            </p>
                            <p>
                                {`${order?.deliveryAddress?.entrance ? 'подъезд ' + order?.deliveryAddress?.entrance : ''}
                        ${order?.deliveryAddress?.floor ? 'этаж ' + order?.deliveryAddress?.floor : ''}`}
                            </p>
                            <p>{order.deliveryAddress?.comment}</p>
                        </div>}
                    <div>
                        <h4>Оплата</h4>
                        <p>
                            {order.paymentMethod === 'bankCard' && 'Онлайн'}
                            {order.paymentMethod === 'qrCode' && 'Онлайн qr-кодом'}
                            {order.paymentMethod === 'cash' && 'Наличными'}
                        </p>
                        <p>
                            {dateOrder}
                        </p>
                    </div>
                    <div>
                        <h4>Покупатель</h4>
                        <p>
                            {order.buyer.name + ' ' + order.buyer.family}
                        </p>
                        <p>
                            {order.buyer.phone}
                        </p>
                    </div>
                </div>

                {status !== OrderEnum.COMPLETED && <button
                    onClick={() => onChangeStatus(status)}
                    className={
                        `button button_dark order-card__button ${status === OrderEnum.AWAITING_CONFIRMATION ? 'confirmation' : ''}`
                    }
                >
                    {status === OrderEnum.AWAITING_CONFIRMATION && 'ПОДТВЕРДИТЬ ЗАКАЗ'}
                    {status === OrderEnum.AWAITING_SHIPMENT && 'ПОДТВЕРДИТЬ ОТПРАВКУ'}
                    {status === OrderEnum.DELIVERY && 'ПОДТВЕРДИТЬ ДОСТАВКУ'}
                </button>}
            </div>
        </div>
    );
};

export default OrderCardMobile;
