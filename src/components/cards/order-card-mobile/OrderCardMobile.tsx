import React, {useState} from 'react';
import './order-card-mobile.scss'
import {IOrderRes} from "../../../models/IOrder";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";
import classNames from "classnames";
import {OrderEnum} from "../../../models/enums";

interface IProps {
    order: IOrderRes,
}


const OrderCardMobile = ({order}: IProps) => {
    const [status, setStatus] = useState<OrderEnum>(order.status)
    const typeGoodArray = useTypeGoodArray(order);

    return (
        <div className={'order-card-mobile'}>
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
            <div>
                <div className={'order-card__status'}>
                    <div className={classNames('status_back', {
                        'status_green_back': status === OrderEnum.COMPLETED,
                        'status_yellow_back': status === OrderEnum.AWAITING_CONFIRMATION || status === OrderEnum.AWAITING_SHIPMENT,
                        'status_violet_back': status === OrderEnum.DELIVERY,
                    })}>
                        <img src={``}/>
                        <span>
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCardMobile;