import React, {useEffect, useMemo, useState} from 'react';
import './order-card.scss'
import {OrderEnum} from "../../../models/enums";
import {IOrderRes} from "../../../models/IOrder";
import {GoodsService} from "../../../services/GoodsService";
import {formatDate} from "../../../utils/formatDate";
import classNames from "classnames";
import {ShelterService} from "../../../services/ShelterService";

interface IProps {
    order: IOrderRes,
    isEven: boolean
}

const OrderCard = ({order, isEven}: IProps) => {
    const [typeGoodArray, setTypeGoodArray] = useState<(string | number)[]>([])
    const [status, setStatus] = useState<OrderEnum>(order.status)

    useEffect(() => {
        const fetchType = async () => {
            const response = await GoodsService.getType(order.goodId, order.typeId)

            if (response.data) {
                const { _id, ...rest } = response.data;

                const valuesArray = Object.values(rest);
                setTypeGoodArray(valuesArray)
            }
        }

        fetchType()
    }, [])

    const dateOrder = useMemo(() => {
        return formatDate(order.createdAt)
    }, [order.createdAt])

    const onChangeStatus = async (status: OrderEnum) => {
        let newStatus: OrderEnum
        if (status === OrderEnum.AWAITING_CONFIRMATION) {
            newStatus = OrderEnum.AWAITING_SHIPMENT
        } else if (status === OrderEnum.AWAITING_SHIPMENT) {
            newStatus = OrderEnum.DELIVERY
        } else if (status === OrderEnum.DELIVERY) {
            newStatus = OrderEnum.COMPLETED
        } else return
        const response = await ShelterService.changeStatus(order._id, newStatus)
        if (response.data) {
            order.status = newStatus
            setStatus(newStatus)
        }
    }

    useEffect(() => {
        console.log('status', status)
    }, [status])

    return (
        <div className={`order-card ${isEven ? 'order-card_even' : 'order-card_odd'}`}>
            <div className={'order-card__name'}>
                <div className={'order-card__img'}>
                    <img src={`https://api.td-market.md/${order.goodPhoto}`} alt=""/>
                </div>
                <div>
                    <h2 className={'order-card__title'}>
                        {order.goodName}
                    </h2>
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
            <div className={'order-card__count'}>
                {order.count} шт.
            </div>
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
