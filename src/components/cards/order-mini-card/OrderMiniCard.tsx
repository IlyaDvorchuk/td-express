import React, {useMemo} from 'react';
import './order-mini-card.scss'
import {IOrderRes} from "../../../models/IOrder";
import classNames from "classnames";
import {OrderEnum} from "../../../models/enums";
import {formatDate} from "../../../utils/formatDate";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";

interface IProps {
    order: IOrderRes,
    isEven: boolean
}

const OrderMiniCard = ({order, isEven}: IProps) => {
    const typeGoodArray = useTypeGoodArray(order.orderTypes);

    const dateOrder = useMemo(() => {
        return formatDate(order.createdAt)
    }, [order.createdAt])

    return (
        <div className={`order-mini-card ${isEven ? 'order-mini-card_even' : 'order-mini-card_odd'}`}>
            <div className={'order-mini-card__name'}>
                {order.orderTypes.map((type, index) => (
                    <div className={'order-mini-card__img'} key={index}>
                        <img src={`https://api.td-market.md/${type.goodPhoto}`} alt=""/>
                    </div>
                ))}
                <div>
                    {order.orderTypes.map((type, index) => (
                        <h2 className={'order-mini-card__title'} key={index}>
                            {type.goodName}
                        </h2>
                    ))}
                    <p className={'order-mini-card__type'}>
                        {typeGoodArray.map((item, index) => (
                            <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                        ))}
                    </p>
                </div>
            </div>
            <div className={'order-mini-card__buyer'}>
                <p>
                    {order.buyer.name + ' ' + order.buyer.family}
                </p>
                <p>
                    {order.buyer.phone}
                </p>
            </div>
            {order.orderTypes.map((type, index) => (
                <div className={'order-mini-card__count'} key={index}>
                    {type.count} шт.
                </div>
            ))}
            <div className={'order-mini-card__payment'}>
                <p>
                    {order.paymentMethod === 'bankCard' && 'Онлайн'}
                    {order.paymentMethod === 'qrCode' && 'Онлайн qr-кодом'}
                    {order.paymentMethod === 'cash' && 'Наличными'}
                </p>
                <p>
                    {dateOrder}
                </p>
            </div>
            <div className={'order-mini-card__delivery'}>
                {order.deliveryMethod === 'pickup' && 'Самовывоз'}
                {order.deliveryMethod === 'express' && 'Экспресс-почтой'}
                {order.deliveryMethod === 'doorstep' && 'Курьером'}
            </div>
            <div className={'order-mini-card__address'}>
                {order.deliveryMethod === 'doorstep' && <p>
                    <p>
                        г. {order.city}
                    </p>
                </p>}
            </div>
            <div className={'order-mini-card__status'}>
                <div className={classNames('status_back', {
                    'status_green_back': order.status === OrderEnum.COMPLETED,
                    'status_yellow_back': order.status  === OrderEnum.AWAITING_CONFIRMATION || order.status  === OrderEnum.AWAITING_SHIPMENT,
                    'status_violet_back': order.status  === OrderEnum.DELIVERY,
                })}>
                    {order.status }
                </div>
            </div>
        </div>
    );
};

export default OrderMiniCard;
