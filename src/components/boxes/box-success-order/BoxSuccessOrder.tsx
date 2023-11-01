import React, {useEffect} from 'react';
import './box-success-order.scss'
import {Link, useLocation} from "react-router-dom";

const BoxSuccessOrder = () => {
    const location = useLocation();


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        // Извлечение параметров из URL
        // const invoiceId = searchParams.get('InvoiceId');
        // const paymentSum = searchParams.get('PaymentSum');
        // const paymentCurrCode = searchParams.get('PaymentCurrCode');
        // const date = searchParams.get('Date');
        const signatureValue = searchParams.get('SignatureValue');
        // const isTest = searchParams.get('istest');
        // ... Другие параметры

        if (signatureValue === localStorage.getItem('signature')) {
            console.log('Подпись верна. Данные не были изменены.');
            // В этом случае, данные верны, можно продолжать обработку
        } else {
            console.log('Подпись не совпадает. Данные могли быть изменены.');
            // В этом случае, данные были изменены, следует обработать это соответствующим образом.
        }
        localStorage.removeItem('signature')

    }, [])

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