import React, {useMemo, useState} from 'react';
import './order-card.scss'
import {OrderEnum} from "../../../models/enums";
import {IOrderRes} from "../../../models/IOrder";
import {formatDate} from "../../../utils/formatDate";
import classNames from "classnames";
import {ShelterService} from "../../../services/ShelterService";
import {AdminService} from "../../../services/AdminService";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";

interface IProps {
    order: IOrderRes,
    isEven: boolean
}

const OrderCard = ({order, isEven}: IProps) => {
    const [status, setStatus] = useState<OrderEnum>(order.status)
    const typeGoodArray = useTypeGoodArray(order.orderTypes);

    const dateOrder = useMemo(() => {
        return formatDate(order.createdAt)
    }, [order.createdAt])

    const onChangeStatus = async (status: OrderEnum) => {
        let newStatus: OrderEnum
        let text;
        const productNames = order.orderTypes.map(orderType => orderType.goodName).join(', ');
        if (status === OrderEnum.AWAITING_CONFIRMATION) {
            newStatus = OrderEnum.AWAITING_SHIPMENT
            text = `Ваш товар: <b>${productNames}</b> ожидает отправки`
        } else if (status === OrderEnum.AWAITING_SHIPMENT) {
            newStatus = OrderEnum.DELIVERY
            text = `Ваш  товар: <b>${productNames}</b> доставляется`
        } else if (status === OrderEnum.DELIVERY) {
            newStatus = OrderEnum.COMPLETED
            text = `Ваш  товар: <b>${productNames}</b> доставлен`
        } else return
        const response = await ShelterService.changeStatus(order._id, newStatus)
        if (order.userId) {
            await AdminService.createNotification(order.userId, text, true)
        }
        if (response.data) {
            order.status = newStatus
            setStatus(newStatus)
        }
    }

    return (
        <div className={`order-card ${isEven ? 'order-card_even' : 'order-card_odd'}`}>
            <div className={'order-card__name'}>
                {order.orderTypes.map((type, index) => (
                    <div className={'order-card__img'} key={index}>
                        <img src={`https://api.td-market.md/${type.goodPhoto}`} alt=""/>
                    </div>
                ))}
                <div>
                    {order.orderTypes.map((type, index) => (
                        <h2 className={'order-card__title'} key={index}>
                            {type.goodName}
                        </h2>
                    ))}
                    <p className={'order-card__type'}>
                        {typeGoodArray.map((item, index) => (
                            <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                        ))}
                    </p>
                </div>
            </div>
            <div className={'order-card__buyer'}>
                <p>
                    {order.buyer.name + ' ' + order.buyer.family}
                </p>
                <p>
                    {order.buyer.phone}
                </p>
            </div>
            <div className={'order-card__price'}>
                {order.price + (order?.deliveryAddress?.deliveryPrice || 0)} р.
            </div>
            {order.orderTypes.map((type, index) => (
                <div className={'order-card__count'} key={index}>
                    {type.count} шт.
                </div>
            ))}
            <div className={'order-card__payment'}>
                <p>
                    {order.paymentMethod === 'bankCard' && 'Онлайн'}
                    {order.paymentMethod === 'qrCode' && 'Онлайн qr-кодом'}
                    {order.paymentMethod === 'cash' && 'Наличными'}
                </p>
                <p>
                    {dateOrder}
                </p>
            </div>
            <div className={'order-card__delivery'}>
                    {order.deliveryMethod === 'pickup' && 'Самовывоз'}
                    {order.deliveryMethod === 'express' && 'Экспресс-почтой'}
                    {order.deliveryMethod === 'doorstep' && 'Курьером'}
            </div>
            <div className={'order-card__address'}>
                {order.deliveryMethod === 'doorstep' && <p>
                    <p>
                        г. {order.city}
                    </p>
                    <p>
                        {`ул. ${order?.deliveryAddress?.street},
                        д. ${order?.deliveryAddress?.house}
                        ${order?.deliveryAddress?.entrance ? 'п. ' + order?.deliveryAddress?.entrance : ''}
                        ${order?.deliveryAddress?.floor ? 'э. ' + order?.deliveryAddress?.floor : ''}
                        ${order?.deliveryAddress?.apartment ? 'кв. ' + order?.deliveryAddress?.apartment : ''}
                        ${order?.deliveryAddress?.comment ? 'комментарий покупателя ' + order?.deliveryAddress?.comment : ''}`}
                    </p>
                    <p>{order.deliveryAddress?.comment}</p>
                </p>}
            </div>
            <div className={'order-card__status'}>
                    <div className={classNames('status_back', {
                        'status_green_back': status === OrderEnum.COMPLETED,
                        'status_yellow_back': status === OrderEnum.AWAITING_CONFIRMATION || status === OrderEnum.AWAITING_SHIPMENT,
                        'status_violet_back': status === OrderEnum.DELIVERY,
                    })}>
                        {status}
                    </div>
            </div>
            <div className={'order-card__wrapper-button'}>
                {status !== OrderEnum.COMPLETED && <button
                    onClick={() => onChangeStatus(status)}
                    className={
                    `button button_light order-card__button ${status === OrderEnum.AWAITING_CONFIRMATION ? 'confirmation' : ''}`
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

export default OrderCard;
