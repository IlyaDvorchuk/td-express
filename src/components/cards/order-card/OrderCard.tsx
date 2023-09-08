import React, {useEffect, useMemo, useState} from 'react';
import './order-card.scss'
import {OrderEnum} from "../../../models/enums";
import {IOrderRes} from "../../../models/IOrder";
import {GoodsService} from "../../../services/GoodsService";
import {formatDate} from "../../../utils/formatDate";
import classNames from "classnames";

interface IProps {
    order: IOrderRes,
    isEven: boolean
}

const OrderCard = ({order, isEven}: IProps) => {
    const [typeGoodArray, setTypeGoodArray] = useState<(string | number)[]>([])

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

    return (
        <div className={`order-card ${isEven ? 'order-card_even' : 'order-card_odd'}`}>
            <div className={'order-card__img'}>
                <img src={`https://api.td-market.md/${order.goodPhoto}`} alt=""/>
            </div>
            <div>
                <h2>
                    {order.goodName}
                </h2>
                <p>
                    {typeGoodArray.map((item, index) => (
                        <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                    ))}
                </p>
            </div>
            <div>
                <p>
                    {order.buyer.name + ' ' + order.buyer.family}
                </p>
                <p>
                    {order.buyer.phone}
                </p>
            </div>
            <div>
                {order.price + (order?.deliveryAddress?.deliveryPrice || 0)} р.
            </div>
            <div>
                {order.count} шт.
            </div>
            <div>
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
                    {order.deliveryMethod === 'pickup' && 'Самовывоз'}
                    {order.deliveryMethod === 'express' && 'Экспресс-почтой'}
                    {order.deliveryMethod === 'doorstep' && 'Курьером'}
            </div>
            <div>
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
            <div>
                <div className={classNames('status status_back', {
                    'status_green_back': order.status === OrderEnum.COMPLETED,
                    'status_yellow_back': order.status === OrderEnum.AWAITING_CONFIRMATION || order.status === OrderEnum.AWAITING_SHIPMENT,
                    'status_violet_back': order.status === OrderEnum.DELIVERY,
                })}>
                    {order.status}
                </div>
            </div>
            <div>
                {order.status !== OrderEnum.COMPLETED && <button className={'button button_light'}>
                    {order.status === OrderEnum.AWAITING_CONFIRMATION && 'ПОДТВЕРДИТЬ ЗАКАЗ'}
                    {order.status === OrderEnum.AWAITING_SHIPMENT && 'ПОДТВЕРДИТЬ ОТПРАВКУ'}
                    {order.status === OrderEnum.DELIVERY && 'ПОДТВЕРДИТЬ ДОСТАВКУ'}
                </button>}
            </div>
        </div>
    );
};

export default OrderCard;
