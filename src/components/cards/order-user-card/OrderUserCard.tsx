import React from 'react';
import './order-user-card.scss'
import {IOrderRes} from "../../../models/IOrder";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";
import {formatDateDay} from "../../../utils/formatDate";
import {Link, useNavigate} from "react-router-dom";
import {useWindowWidth} from "../../../hooks/useWindowWidth";
import Status from "../../status/Status";

interface IProps {
    order: IOrderRes
}

const OrderUserCard = ({order}: IProps) => {
    const navigation = useNavigate()
    const typeGoodArray = useTypeGoodArray(order);
    const windowWidth = useWindowWidth();

    const onClickCard = () => {
        if (windowWidth < 810) {
            navigation(`/order/${order._id}`, {
                state: order
            })
        }
    }

    return (
        <div>
            <div className={'order-user-card__status-mobile'}>
                <div className={'paragraph'}>
                    Статус заказа
                </div>
                <Status status={order.status}/>
            </div>
            <div onClick={onClickCard} className={'order-user-card'}>
                <div className={'order-user-card__image'}>
                    <img src={`https://api.td-market.md/${order.goodPhoto}`} alt={order.goodName}/>
                </div>
                <div className={'order-user-card__data'}>
                    <h4 className={'order-user-card__price-mobile'}>{order.price} RUP</h4>
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
                    <Status status={order.status}/>
                    <p className={'order-user-card__price'}>{order.price} RUP</p>
                    <Link to={`/order/${order._id}`} state={{ ...order }} className={'button button_light order-user-card__button'}>
                        Подробнее о заказе
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default OrderUserCard;