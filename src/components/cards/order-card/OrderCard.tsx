import React from 'react';
import './order-card.scss'
import {OrderEnum} from "../../../models/enums";
import {IOrderRes} from "../../../models/IOrder";

interface IProps {
    order: IOrderRes,
    isEven: boolean
    selectedStatus: OrderEnum | null
}

const OrderCard = ({order, isEven, selectedStatus}: IProps) => {
    return (
        <div className={`order-card ${isEven ? 'order-card_even' : 'order-card_odd'}`}>
            <div className={'order-card__img'}>
                <img src={`https://api.td-market.md/${order.goodPhoto}`} alt=""/>
            </div>

        </div>
    );
};

export default OrderCard;