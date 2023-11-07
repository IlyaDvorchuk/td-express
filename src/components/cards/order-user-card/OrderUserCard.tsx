import React from 'react';
import './order-user-card.scss'
import {IOrderRes} from "../../../models/IOrder";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";
import {formatDateDay} from "../../../utils/formatDate";
import {OrderEnum} from "../../../models/enums";
import classNames from "classnames";
import {Link} from "react-router-dom";

interface IProps {
    order: IOrderRes
}

const OrderUserCard = ({order}: IProps) => {
    const typeGoodArray = useTypeGoodArray(order);

    return (
        <div className={'order-user-card'}>
            <div className={'order-user-card__image'}>
                <img src={`https://api.td-market.md/${order.goodPhoto}`} alt={order.goodName}/>
            </div>
            <div className={'order-user-card__data'}>
                <h4 className={'order-user-card__name'}>{order.goodName}</h4>
                <p className={'order-user-card__inf'}>
                    {typeGoodArray.map((item, index) => (
                        <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                    ))}
                </p>
                <p className={'order-user-card__inf'}>{order.count} шт.</p>
                <p className={'order-user-card__inf order-user-card__date'}>
                    Дата заказа: <span>{formatDateDay(order.createdAt)}</span>
                </p>
            </div>
            <div className={'order-user-card__right'}>
                <div className={'order-user-card__status'}>
                    <div className={classNames('status-color', {
                        'status-color_grey': order.status === OrderEnum.AWAITING_CONFIRMATION,
                        'status-color_yellow': order.status === OrderEnum.AWAITING_SHIPMENT,
                        'status-color_orange': order.status === OrderEnum.DELIVERY,
                        'status-color_green': order.status === OrderEnum.COMPLETED,
                    })}/>
                    <div className={'status-text'}>
                        {order.status === OrderEnum.AWAITING_CONFIRMATION && 'ожидает подтверждения'}
                        {order.status === OrderEnum.AWAITING_SHIPMENT && 'заказ подтверждён'}
                        {order.status === OrderEnum.DELIVERY && 'заказ отправлен'}
                        {order.status === OrderEnum.COMPLETED && 'заказ завершён'}
                    </div>
                </div>
                <p className={'order-user-card__price'}>{order.price} RUP</p>
                <Link to={'/'} className={'button button_light order-user-card__button'}>
                    Подробнее о заказе
                </Link>
            </div>
        </div>
    );
};

export default OrderUserCard;