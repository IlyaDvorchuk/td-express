import React from 'react';
import './box-failure-order.scss'
import {Link} from "react-router-dom";

const BoxFailureOrder = () => {
    return (
        <div className={'order-failure'}>
            <h2 className={'order-failure__title'}>Ошибка оплаты</h2>
            <p className={'order-failure__p'}>Ошибка системы. Транзакция не может быть выполнена.</p>
            <p className={'order-failure__p'}>Предложение: повторите попытку позже или обратитесь в службу поддержки.</p>
            <Link to={'/'} className={'button button_light order-success__button'}>На главную</Link>
        </div>
    );
};

export default BoxFailureOrder;