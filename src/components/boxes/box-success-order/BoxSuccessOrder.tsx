import React, {useEffect, useState} from 'react';
import './box-success-order.scss'
import {Link} from "react-router-dom";
import {IOrder} from "../../../models/IOrder";
import {useAppDispatch} from "../../../hooks/redux";
import {createOrder} from "../../../store/reducers/user/UserCreators";

const BoxSuccessOrder = () => {
    const dispatch = useAppDispatch()
    const [idOrder, setIdOrder] = useState('0')


    useEffect(() => {
        // const searchParams = new URLSearchParams(location.search);

        // Извлечение параметров из URL
        // const invoiceId = searchParams.get('InvoiceId');
        // const paymentSum = searchParams.get('PaymentSum');
        // const paymentCurrCode = searchParams.get('PaymentCurrCode');
        // const date = searchParams.get('Date');
        // const signatureValue = searchParams.get('SignatureValue');
        // const isTest = searchParams.get('istest');
        // ... Другие параметры

        // if (signatureValue && signatureValue === localStorage.getItem(signatureValue)) {
            const localOrder = localStorage.getItem('SignatureValue')
            if (localOrder) {
                const order = JSON.parse(localOrder) as IOrder
                console.log('order', order)
                setIdOrder(order.orderId.split('_')[1])
                dispatch(createOrder(order))
            }
            console.log('Подпись верна. Данные не были изменены.');
            // В этом случае, данные верны, можно продолжать обработку
        // } else {
        //     console.log('Подпись не совпадает. Данные могли быть изменены.');
            // В этом случае, данные были изменены, следует обработать это соответствующим образом.
        // }
        localStorage.removeItem('signature')
        sessionStorage.removeItem('form-order')

    }, [])

    return (
        <div className={'order-success'}>
            <h3 className={'order-success__subtitle'}>Заказ успешно оформлен</h3>
            <h2 className={'order-success__title'}>Спасибо за заказ!</h2>
            <p className={'order-success__p'}>
                Ваша оплата принята! Номер вашей оплаты: <b>#{idOrder}
            </b></p>
            <Link to={'/'} className={'button button_light order-success__button'}>На главную</Link>
        </div>
    );
};


export default BoxSuccessOrder;