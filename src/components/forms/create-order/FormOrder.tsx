import React, {useEffect, useMemo, useState} from 'react';
import './form-order.scss'
import useFetchCard from "../../../hooks/fetch-card";
import {useForm} from "react-hook-form";
import Select from "react-select";

const citiesOptions = [
    {
        value: 'Тирасполь',
        label: 'Тирасполь'
    },
    {
        value: 'Бендеры',
        label: 'Бендеры'
    },
    {
        value: 'Рыбница',
        label: 'Рыбница'
    },
    {
        value: 'Дубоссары',
        label: 'Дубоссары'
    },
    {
        value: 'Слободзея',
        label: 'Слободзея'
    },
    {
        value: 'Григориополь',
        label: 'Григориополь'
    },
    {
        value: 'Каменка',
        label: 'Каменка'
    },
]


const FormOrder = () => {
    const card = useFetchCard();
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const { register, handleSubmit } = useForm();


    useEffect(() => {
        console.log('card', card)
    }, [card])

    const typeGood = useMemo(() => {
        // @ts-ignore
        return JSON.parse(localStorage.getItem('typeGood')).count
    }, [])

    // const finalPrice = useMemo(() => {
    //     if (!card) {
    //         return 0; // По умолчанию вернем 0 или другое значение, в зависимости от вашей логики
    //     }
    //
    //     const basePrice = card?.pricesAndQuantity.priceBeforeDiscount || card?.pricesAndQuantity.price;
    //     const discount = card?.pricesAndQuantity.priceBeforeDiscount ? card.pricesAndQuantity.price : 0;
    //     const deliveryCharge = selectedDelivery === 'doorstep' ? 30 : 0;
    //
    //     return basePrice - discount + deliveryCharge;
    // }, [selectedDelivery, card]);


    const finalPrice = useMemo(() => {
        if (!card) {
            return 0; // По умолчанию вернем 0 или другое значение, в зависимости от вашей логики
        }

        const deliveryCharge = selectedDelivery === 'doorstep' ? 30 : 0;

        return card?.pricesAndQuantity.price * typeGood + deliveryCharge;
    }, [selectedDelivery, card]);
    const onSubmit = (data: any) => {
        console.log(data);
    };


    return (
        <form className={'order'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'order__title'}>Оформление заказа</h3>
            <div className={'order__container'}>
                <div className={'order__ordering'}>
                    <div className={'order__radio'}>
                        <p className={'label order__label_up'}>Выберите способ доставки</p>
                        {card && card?.deliveryPoints?.length > 0 && <div className={'wrapper-radio'}>
                            <label htmlFor="pickup" className={`custom-radio ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="pickup"
                                    value="pickup"
                                    {...register('delivery' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedDelivery('pickup')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>Самовывоз</p>
                        </div>}
                        <div className={'wrapper-radio'}>
                            <label htmlFor="express" className={`custom-radio ${selectedDelivery === 'express' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="express"
                                    value="express"
                                    {...register('delivery' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedDelivery('express')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'express' ? 'selected' : ''}`}>Доставка экспресс-почтой</p>
                        </div>
                        <div className={'wrapper-radio'}>
                            <label htmlFor="doorstep" className={`custom-radio ${selectedDelivery === 'doorstep' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="doorstep"
                                    value="doorstep"
                                    {...register('delivery' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedDelivery('doorstep')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'doorstep' ? 'selected' : ''}`}>Доставка до двери</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="order-city" className={'label order__label_up'}>Выберите город доставки</label>
                        <Select
                            className={'order__cities'}
                            id={'order-city'}
                            classNamePrefix={'select'}
                            options={citiesOptions}
                            defaultValue={{
                                value: localStorage.getItem('city') || 'Тирасполь',
                                label: localStorage.getItem('city') || 'Тирасполь'
                            }}
                            isSearchable={false}
                        />
                    </div>

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Адрес доставки</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Улица</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Дом</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Подъезд</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Этаж</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Квартира</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Комментарий для курьера (домофон не работает, оставить у двери и т.д.)</label>
                                <textarea className={'modalInput modalInput_light order__textarea'}/>
                            </div>
                        </div>
                    </div>

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Данные о получателе</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Фамилия</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Имя</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Номер тефона</label>
                                <input className={'modalInput modalInput_light'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Способ оплаты</h4>
                        {card && card?.deliveryPoints?.length > 0 && <div className={'wrapper-radio'}>
                            <label htmlFor="bankCard" className={`custom-radio ${selectedPayment === 'bankCard' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="bankCard"
                                    value="bankCard"
                                    {...register('payment' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedPayment('bankCard')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedPayment === 'pickup' ? 'selected' : ''}`}>Карта Клевер</p>
                        </div>}
                        <div className={'wrapper-radio'}>
                            <label htmlFor="qrCode" className={`custom-radio ${selectedPayment === 'qrCode' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="qrCode"
                                    value="qrCode"
                                    {...register('payment' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedPayment('qrCode')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedPayment === 'express' ? 'selected' : ''}`}>QR-код</p>
                        </div>
                        <div className={'wrapper-radio'}>
                            <label htmlFor="cash" className={`custom-radio ${selectedPayment === 'cash' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="cash"
                                    value="cash"
                                    {...register('payment' as const)}
                                    className="radio-input"
                                    onChange={() => setSelectedPayment('cash')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedPayment === 'doorstep' ? 'selected' : ''}`}>Наличными</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={'cart-ordering'}>
                        <h4 className={'order__subtitle'}>Ваш заказ</h4>
                        <div className={'cart-ordering__price'}>
                        <span>
                            Товары, {typeGood || 1}
                        </span>
                            <span>{card && (card?.pricesAndQuantity.priceBeforeDiscount ?
                                (card.pricesAndQuantity.priceBeforeDiscount * typeGood) : (card.pricesAndQuantity.price * typeGood))} RUP</span>
                        </div>
                        {card?.pricesAndQuantity.priceBeforeDiscount && <div className={'cart-ordering__price'}>
                        <span>
                            Скидка
                        </span>
                            <span>{(card?.pricesAndQuantity.priceBeforeDiscount - card?.pricesAndQuantity.price) * typeGood} RUP</span>
                        </div>}
                        <div className={'cart-ordering__price'}>
                            {selectedDelivery === 'doorstep' && <>
                                <span>
                                    Доставка
                                </span>
                                <span>
                                    30 RUP
                                </span>
                            </>
                            }
                        </div>
                        <div className={'cart-ordering__finish order__finish'}>
                        <span>
                            Итого
                        </span>
                            <span>{finalPrice} RUP</span>
                        </div>
                        <button className={'button button_not-active cart-ordering__buttons'}>Подтвердить и оплатить</button>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default FormOrder;
