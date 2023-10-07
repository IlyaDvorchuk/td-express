import React from 'react';
import './box-success-order.scss'
import {Link} from "react-router-dom";

const BoxSuccessOrder = () => {
    return (
        <div className={'order-success'}>
            <h3 className={'order-success__subtitle'}>Заказ успешно оформлен</h3>
            <h2 className={'order-success__title'}>Спасибо за заказ!</h2>
            <p className={'order-success__p'}>
                Ваша оплата принята! Номер вашей оплаты: <b>#{localStorage.getItem('id-order') || ''}
            </b></p>
            <Link to={'/'} className={'button button_light order-success__button'}>На главную</Link>
        </div>
    );
};

export default BoxSuccessOrder;