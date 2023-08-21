import React, {useEffect, useState} from 'react';
import './box-order.scss'
import Select from "react-select";
import useFetchCard from "../../../hooks/fetch-card";
import {useForm, FieldValues, UseFormRegisterReturn} from "react-hook-form";

type InputProps = {
    ref: UseFormRegisterReturn; // Используйте тип UseFormRegisterReturn для рефа
} & React.InputHTMLAttributes<HTMLInputElement>;

const BoxOrder = () => {
    const card = useFetchCard();
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    useEffect(() => {
        console.log('card', card)
    }, [card])

    const handleDeliveryChange = (value: string) => {
        setSelectedDelivery(value);
    };

    return (
        <form className={'order'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'order__title'}>Оформление заказа</h3>
            <div>
                <div>
                    <div>
                        <p className={'order__label order__label_up'}>Выберите способ доставки</p>
                        {card && card?.deliveryPoints?.length > 0 && <div className={`order__radio ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                id="pickup"
                                value="pickup"
                                {...register('delivery' as const)} // Регистрируем input
                            />
                            <label htmlFor="pickup">Самовывоз</label>
                        </div>}
                        <div className={`order__radio ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                id="express"
                                value="pickup"
                                {...register('delivery' as const)} // Регистрируем input
                            />
                            <label htmlFor="express">Доставка экспресс-почтой</label>
                        </div>
                        <div className={`order__radio ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                id="doorstep"
                                value="pickup"
                                {...register('delivery' as const)} // Регистрируем input
                            />
                            <label htmlFor="doorstep">Доставка до двери</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="order-city">Выберите город доставки</label>
                        <Select id={'order-city'}/>
                    </div>

                    <div>
                        <h4>Адрес доставки</h4>
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
                    <div>
                        <h4>Данные о получателе</h4>
                        <div>
                            <label htmlFor="">Фамилия</label>
                            <input/>
                        </div>
                        <div>
                            <label htmlFor="">Имя</label>
                            <input/>
                        </div>
                        <div>
                            <label htmlFor="">Номер телефона</label>
                            <input/>
                        </div>

                    </div>
                    <div>
                        <h4>Способ оплаты</h4>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BoxOrder;
