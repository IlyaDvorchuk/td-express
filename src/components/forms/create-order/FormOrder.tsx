import React, {useEffect, useState} from 'react';
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
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    useEffect(() => {
        console.log('card', card)
    }, [card])



    return (
        <form className={'order'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'order__title'}>Оформление заказа</h3>
            <div>
                <div>
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
                        <label htmlFor="order-city" className={'label'}>Выберите город доставки</label>
                        <Select
                            className={'order__cities'}
                            id={'order-city'}
                            classNamePrefix={'select'}
                            options={citiesOptions}
                            defaultValue={citiesOptions[0]}
                            isSearchable={false}
                        />
                    </div>

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Адрес доставки</h4>
                        <div className={'order__inputs-container'}>
                            <div>
                                <label htmlFor="">Улица</label>
                                <input/>
                            </div>
                            <div>
                                <label htmlFor="">Дом</label>
                                <input/>
                            </div>
                            <div>
                                <label htmlFor="">Подъезд</label>
                                <input/>
                            </div>
                            <div>
                                <label htmlFor="">Этаж</label>
                                <input/>
                            </div>
                            <div>
                                <label htmlFor="">Квартира</label>
                                <input/>
                            </div>
                            <div>
                                <label htmlFor="">Комментарий для курьера (домофон не работает, оставить у двери и т.д.)</label>
                                <textarea/>
                            </div>
                        </div>

                    </div>
                    {/*<div>*/}
                    {/*    <h4>Данные о получателе</h4>*/}
                    {/*    <div>*/}
                    {/*        <label htmlFor="">Фамилия</label>*/}
                    {/*        <input/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label htmlFor="">Имя</label>*/}
                    {/*        <input/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label htmlFor="">Номер телефона</label>*/}
                    {/*        <input/>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h4>Способ оплаты</h4>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div>
                <button type={'submit'}>ПОДТВЕРДИТЬ И ОПЛАТИТЬ</button>
            </div>
        </form>
    );
};

export default FormOrder;
