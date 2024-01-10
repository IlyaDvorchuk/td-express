import React, {useEffect, useMemo, useState} from 'react';
import './form-order.scss'
import useFetchCard from "../../../hooks/fetch-card";
import {useForm, Controller } from "react-hook-form";
import Select, {SingleValue} from "react-select";
import {useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/IOrder";
import {useNavigate} from "react-router-dom";
import {createIdOrder} from "../../../utils/formatDate";
import CryptoJS from 'crypto-js';
import {EXPRESS_POINTS} from "../../../constants";

type TCity = {
    value: string; label: string; price: string
}

const FormOrder = () => {
    const navigate = useNavigate()
    const card = useFetchCard();

    const {user} = useAppSelector(state => state.userReducer)
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [city, setCity] = useState<TCity | null>(null)
    const [isActiveButton, setIsActiveButton] = useState<boolean>(false)

    const deliveryCities = useMemo(() => {
        if (selectedDelivery === 'express') {
            return EXPRESS_POINTS.map(city => ({
                value: city,
                label: city,
                price: 0
            })) as unknown as TCity[]
        }

        if (!card?.deliveryCities) {
            return []
        }

        return card?.deliveryCities.map(city => ({
            value: city.city,
            label: city.city,
            price: city.price
        }))
    }, [card?.deliveryCities, selectedDelivery])


    useEffect(() => {

    }, [card])

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: {errors},
        clearErrors
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


    useEffect(() => {
        console.log('card', card)
    }, [card])

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
        clearErrors('delivery')
    }

    const onChangePayment = (payment: string) => {
        setSelectedPayment(payment)
        setValue('paymentMethod', payment)
        clearErrors('paymentMethod')
    }

    const onChangeCity = (newValue: SingleValue<TCity>) => {
        setCity(newValue)
    }

    const createHiddenInput = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        return input;
    };

    const onSubmit = (data: any) => {
        // if (selectedDelivery === 'doorstep') {
        //     setErrorCity(true)
        //     return
        // }
        if (!card
            && !isActiveButton
        ) return
        const id = createIdOrder();

        const order = {
            orderId: id,
            orderTypes: [
                {
                    goodName: card?.information.name,
                    typeId: card?.currentType?._id,
                    goodPhoto: card?.mainPhoto,
                    goodId: card?._id,
                    price: finalPrice - ((city && selectedDelivery === 'doorstep') ? +city.price : 0),
                    count: typeGood || 1,
                    shelterId: card?.shelterId,

                }
            ],
            price: finalPrice - ((city && selectedDelivery === 'doorstep') ? +city.price : 0),
            shelterIds: [card?.shelterId],
            userId: user ? user._id : null,
            status: 'ожидает подтверждения',
            deliveryMethod: data.delivery,
            paymentMethod: data?.paymentMethod || 'bankCard',
            buyer: {
                family: data.family,
                name: data.name,
                phone: data.phone,
            },
            city: city?.value || '',
            isTdMarket: card?.marketDelivery !== 'self-delivery'
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


        localStorage.setItem('id-order', id.split(' ')[1])
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.agroprombank.com/payments/PaymentStart';

        const parameters = [
            { name: 'MerchantLogin', value: '000209' },
            { name: 'nivid', value: id },
            { name: 'istest', value: '0' },
            // { name: 'RequestSum', value: `${finalPrice * 100}` },
            { name: 'RequestSum', value: `5` },
            { name: 'RequestCurrCode', value: '000' },
            { name: 'Desc', value: `Оплата заказа №${id.split(' ')[1]}, ${card?.information.name}` },
        ];

        parameters.forEach(({ name, value }) => {
            form.appendChild(createHiddenInput(name, value));
        });


        const signature = `000209:${id}:0:${parameters[3].value}:000:${parameters[5].value}:HBmWYiyiwWrCsYlsD6Qk`;
        localStorage.setItem('SignatureValue', JSON.stringify({...order, currentType: card?.currentType
    }))
        form.appendChild(createHiddenInput('SignatureValue', CryptoJS.MD5(signature).toString()));

        console.log('form', form);
        document.body.appendChild(form);
        // form.submit();
        // dispatch(createOrder(order, card?.activeSize))
        navigate('/success')
    };

    const isDoorstepDelivery = watch('delivery');

    const streetValidation = register('street', {
        required: isDoorstepDelivery === 'doorstep' ? 'Улица обязательна' : false,
    });
    const houseValidation = register('house', {
        required: isDoorstepDelivery === 'doorstep' ? 'Дом обязателен' : false,
    });


    return (
        <form className={'order'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'order__title'}>Оформление заказа</h3>
            <div className={'order__container'}>
                <div className={'order__ordering'}>
                    <div className={'order__radio'}>
                        <p className={`label order__label_up ${errors.delivery ? 'error' : ''}`}>Выберите способ доставки*</p>
                        {card && card?.deliveryPoints?.length > 0 && <div className={'wrapper-radio'}>
                            <label htmlFor="pickup"
                                   className={`custom-radio ${errors.delivery ? 'error' : ''} ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="pickup"
                                    value="pickup"
                                    {...register('delivery' as const, { required: true })}
                                    className="radio-input"
                                    onChange={() => onChangeDelivery('pickup')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'pickup' ? 'selected' : ''}`}>Самовывоз</p>
                        </div>}
                        <div className={'wrapper-radio'}>
                            <label htmlFor="express"
                                   className={`custom-radio ${errors.delivery ? 'error' : ''} ${selectedDelivery === 'express' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="express"
                                    value="express"
                                    {...register('delivery' as const, { required: true })}
                                    className="radio-input"
                                    onChange={() => onChangeDelivery('express')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'express' ? 'selected' : ''}`}>Доставка экспресс-почтой</p>
                        </div>
                        <div className={'wrapper-radio'}>
                            <label htmlFor="doorstep"
                                   className={`custom-radio ${errors.delivery ? 'error' : ''} ${selectedDelivery === 'doorstep' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="doorstep"
                                    value="doorstep"
                                    {...register('delivery' as const, { required: true })}
                                    className="radio-input"
                                    onChange={() => onChangeDelivery('doorstep')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedDelivery === 'doorstep' ? 'selected' : ''}`}>Доставка до двери</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="order-city" className={`label order__label_up`}>Выберите {selectedDelivery === 'express' ? 'место' : 'город'} доставки</label>
                        <Controller
                            name="city" // Укажите имя поля, которое будет использоваться в react-hook-form
                            control={control} // Передайте объект control из useForm
                            render={({ field }) => (
                                <Select
                                    className={`order__cities ${selectedDelivery === 'express' ? 'large' : ''}`}
                                    id={'order-city'}
                                    classNamePrefix={'select'}
                                    options={deliveryCities}
                                    {...field}
                                    isSearchable={false}
                                    value={selectedDelivery === 'doorstep' ? city : deliveryCities[0]}
                                    onChange={onChangeCity}
                                />
                            )}
                        />
                    </div>

                    {selectedDelivery === 'doorstep' && <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Адрес доставки</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={'label'}
                                       htmlFor="street">Улица{selectedDelivery === 'doorstep' ? '*' : ''}</label>
                                <input
                                    id={'street'}
                                    disabled={selectedDelivery !== 'doorstep'}
                                    className={'modalInput modalInput_light'}
                                    {...streetValidation}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'}
                                       htmlFor="house">Дом{selectedDelivery === 'doorstep' ? '*' : ''}</label>
                                <input
                                    id={'house'}
                                    disabled={selectedDelivery !== 'doorstep'}
                                    className={'modalInput modalInput_light'}
                                    {...houseValidation}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="entrance">Подъезд</label>
                                <input
                                    disabled={selectedDelivery !== 'doorstep'}
                                    id={'entrance'}
                                    className={'modalInput modalInput_light'}
                                    {...register('entrance')}
                                />
                            </div>
                            <div className={'input-box order__input_short'}>
                                <label className={'label'} htmlFor="floor">Этаж</label>
                                <input
                                    disabled={selectedDelivery !== 'doorstep'}
                                    id={'floor'}
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
                                <label className={'label'} htmlFor="">Комментарий для курьера (домофон не работает,
                                    оставить у двери и т.д.)</label>
                                <textarea
                                    className={'modalInput modalInput_light order__textarea'}
                                    {...register('comment')}
                                />
                            </div>
                        </div>
                    </div>}

                    <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Данные о получателе</h4>
                        <div className={'order__inputs-container'}>
                            <div className={'input-box'}>
                                <label className={`label ${errors.family ? 'error' : ''}`} htmlFor="">Фамилия*</label>
                                <input
                                    className={`modalInput modalInput_light ${errors.family ? 'error' : ''}`}
                                    {...register('family', { required: 'Введите название товара' })}
                                />
                            </div>
                            <div className={'input-box'}>
                                <label className={`label ${errors.name ? 'error' : ''}`} htmlFor="">Имя*</label>
                                <input
                                    className={`modalInput modalInput_light ${errors.name ? 'error' : ''}`}
                                    {...register('name', { required: 'Введите название товара' })}
                                />
                            </div>
                            <div className={'input-box'}>
                                <label className={`label ${errors.phone ? 'error' : ''}`} htmlFor="">Номер тефона*</label>
                                <input
                                    className={`modalInput modalInput_light  ${errors.phone ? 'error' : ''}`}
                                    {...register('phone', { required: 'Введите название товара' })}
                                />
                            </div>
                        </div>
                    </div>
                    {selectedDelivery === 'pickup' &&  <div className={'order__inputs'}>
                        <h4 className={'order__subtitle'}>Способ оплаты</h4>
                        <div className={'wrapper-radio'}>
                            <label htmlFor="bankCard"
                                   className={`custom-radio ${errors.paymentMethod ? 'error' : ''} ${selectedPayment === 'bankCard' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="bankCard"
                                    value="bankCard"
                                    {...register('paymentMethod' as const, {required: true})}
                                    className="radio-input"
                                    onChange={() => onChangePayment('bankCard')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedPayment === 'pickup' ? 'selected' : ''}`}>Банковская
                                карта</p>
                        </div>
                        <div className={'wrapper-radio'}>
                            <label htmlFor="cash"
                                   className={`custom-radio ${errors.paymentMethod ? 'error' : ''} ${errors.delivery ? 'error' : ''} ${selectedPayment === 'cash' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="cash"
                                    value="cash"
                                    {...register('paymentMethod' as const, {required: true})}
                                    className="radio-input"
                                    onChange={() => onChangePayment('cash')}
                                />
                            </label>
                            <p className={`wrapper-radio__text ${selectedPayment === 'doorstep' ? 'selected' : ''}`}>Наличными</p>
                        </div>
                    </div>}
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
                        <button className={`button cart-ordering__buttons ${!isActiveButton ? 'button_not-active' : 'button_light'}`}>Подтвердить {selectedDelivery !== 'pickup' ? 'и оплатить' : ''}</button>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default FormOrder;
