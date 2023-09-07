import React, {useEffect, useMemo, useState} from 'react';
import './form-order.scss'
import useFetchCard from "../../../hooks/fetch-card";
import {useForm, Controller } from "react-hook-form";
import Select, {SingleValue} from "react-select";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/IOrder";
import {createOrder} from "../../../store/reducers/user/UserCreators";
import {useNavigate} from "react-router-dom";

type TCity = {
    value: string; label: string; price: string
}

const FormOrder = () => {
    const navigate = useNavigate()
    const card = useFetchCard();
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [city, setCity] = useState<TCity | null>(null)
    const [isActiveButton, setIsActiveButton] = useState<boolean>(false)

    const deliveryCities = useMemo(() => {
        if (!card?.deliveryCities) {
            return []
        }

        return card?.deliveryCities.map(city => ({
            value: city.city,
            label: city.city,
            price: city.price
        }))
    }, [card?.deliveryCities])


    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch
    } = useForm({
        defaultValues: {
            delivery: '',
            paymentMethod: '',
            city: city,
            street: '',
            house: '',
            entrance: '',
            floor: '',
            apartment: '',
            comment: '',
            family: '',
            name: '',
            phone: '',
        },
    });

    const formData = watch(['delivery', 'paymentMethod', 'family', 'name', 'phone', 'street', 'house']);

    useEffect(() => {
        let isActive;

        if (formData[0] === 'doorstep') {
            isActive = formData.every(element => element !== '');
        } else {
            isActive = formData.slice(0, 4).every(element => element !== '');
        }

        setIsActiveButton(isActive);
    }, [formData]);

    const typeGood = useMemo(() => {
        // @ts-ignore
        return JSON.parse(localStorage.getItem('typeGood')).count
    }, [])


    useEffect(() => {
        const deliveryCities = card?.deliveryCities || [];

        const cityIndex = deliveryCities.findIndex(city => city.city === localStorage.getItem('city'));

        if (cityIndex !== -1) {
            const town = {
                value: deliveryCities[cityIndex].city,
                label: deliveryCities[cityIndex].city,
                price: deliveryCities[cityIndex].price,
            }
            setCity(town)
            setValue('city', town)
            return
        }

        if (deliveryCities.length > 0) {
            const town = {
                value: deliveryCities[0].city,
                label: deliveryCities[0].city,
                price: deliveryCities[0].price,
            }
            setCity(town)
            setValue('city', town)
            return
        }
        setCity(null)
    }, [card?.deliveryCities])



    const finalPrice = useMemo(() => {
        if (!card) {
            return 0; // По умолчанию вернем 0 или другое значение, в зависимости от вашей логики
        }

        const deliveryCharge = (selectedDelivery === 'doorstep' && city) ? +city.price : 0;

        return card?.pricesAndQuantity.price * typeGood + deliveryCharge;
    }, [selectedDelivery, card, city, selectedDelivery]);


    const onChangeDelivery = (delivery: string) => {
        setSelectedDelivery(delivery)
        setValue('delivery', delivery)
    }

    const onChangePayment = (payment: string) => {
        setSelectedPayment(payment)
        setValue('paymentMethod', payment)
    }

    const onChangeCity = (newValue: SingleValue<TCity>) => {
        setCity(newValue)
    }

    const onSubmit = (data: any) => {

        if (!card
            && !isActiveButton
        ) return

        const order = {
            goodId: card?._id,
            typeId: card?.activeSizeId,
            userId: user ? user._id : null,
            shelterId: card?.shelterId,
            status: 'Покупка',
            deliveryMethod: data.delivery,
            paymentMethod: data.paymentMethod,
            buyer: {
                family: data.family,
                name: data.name,
                phone: data.phone,
            },
            price: finalPrice - (city ? +city.price : 0),
            count: typeGood || 1,
            city: city?.value || ''
        } as IOrder

        if (data.delivery === 'doorstep') {
            order.deliveryAddress = {
                street: data.street,
                house: data.house,
                entrance: data.entrance,
                floor: data.floor,
                apartment: data.apartment,
                comment: data.comment,
                deliveryPrice: city ? +city?.price : 0,
            }
        }
        dispatch(createOrder(order))
        navigate('/')
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
                                    onChange={() => onChangeDelivery('pickup')}
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
                                    onChange={() => onChangeDelivery('express')}
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
                                    onChange={() => onChangeDelivery('doorstep')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'doorstep' ? 'selected' : ''}`}>Доставка до двери</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="order-city" className={'label order__label_up'}>Выберите город доставки</label>
                        <Controller
                            name="city" // Укажите имя поля, которое будет использоваться в react-hook-form
                            control={control} // Передайте объект control из useForm
                            render={({ field }) => (
                                <Select
                                    className={'order__cities'}
                                    id={'order-city'}
                                    classNamePrefix={'select'}
                                    options={deliveryCities}
                                    {...field}
                                    isSearchable={false}
                                    value={city}
                                    onChange={onChangeCity}
                                />
                            )}
                        />
                    </div>

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Адрес доставки</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Улица</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('street')}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Дом</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('house')}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Подъезд</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('entrance')}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Этаж</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('floor')}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="">Квартира</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('apartment')}
                                />
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Комментарий для курьера (домофон не работает, оставить у двери и т.д.)</label>
                                <textarea
                                    className={'modalInput modalInput_light order__textarea'}
                                    {...register('comment')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Данные о получателе</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Фамилия</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('family')}
                                />
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Имя</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('name')}
                                />
                            </div>
                            <div className={'input-box'}>
                                <label className={'label'} htmlFor="">Номер тефона</label>
                                <input
                                    className={'modalInput modalInput_light'}
                                    {...register('phone')}
                                />
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
                                    {...register('paymentMethod' as const)}
                                    className="radio-input"
                                    onChange={() => onChangePayment('bankCard')}
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
                                    {...register('paymentMethod' as const)}
                                    className="radio-input"
                                    onChange={() => onChangePayment('qrCode')}
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
                                    {...register('paymentMethod' as const)}
                                    className="radio-input"
                                    onChange={() => onChangePayment('cash')}
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
                                    {city?.price || 0} RUP
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
                        <button className={`button cart-ordering__buttons ${!isActiveButton ? 'button_not-active' : 'button_light'}`}>Подтвердить и оплатить</button>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default FormOrder;
