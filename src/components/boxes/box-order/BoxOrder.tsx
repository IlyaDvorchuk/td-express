import React from 'react';
import './box-order.scss'
import {IOrderRes} from "../../../models/IOrder";

const BoxOrder = ({order}: {order: IOrderRes}) => {
    return (
        <div className={'box-order'}>
            <h2>Заказ №</h2>
        </div>
    );
};

export default BoxOrder;