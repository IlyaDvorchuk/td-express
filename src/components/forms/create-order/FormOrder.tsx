import React, {useEffect, useMemo, useState} from 'react';
import './form-order.scss'
import {useForm, Controller } from "react-hook-form";
import Select, {SingleValue} from "react-select";
import {useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/IOrder";
import {useNavigate} from "react-router-dom";
import {createIdOrder} from "../../../utils/formatDate";
import CryptoJS from 'crypto-js';
import {EXPRESS_POINTS} from "../../../constants";
import useSetOrder from "../../../hooks/set-order";
import {UserService} from "../../../services/UserService";
import {IDeliveryPoint2} from "../../../models/IDeliveryPoint";
import DeliveryPoint from "../../delivery-point/DeliveryPoint";

type TCity = {
    value: string; label: string; price: string
}

const FormOrder = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.userReducer)
    const orderStore = useSetOrder()
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [city, setCity] = useState<TCity | null>(null)
    const [isActiveButton, setIsActiveButton] = useState<boolean>(false)
    const [deliveryPoints, setDeliveryPoints] = useState<IDeliveryPoint2[]>([])
    const [checkedBoxes, setCheckedBoxes] = useState<boolean[]>([]);

    useEffect(() => {
        const getCard = async () => {
            const card = orderStore.cards[0]?.card
            if (!card) return
            if (card.deliveryPoints && card.shelterId) {
                const response = await UserService.getDeliveryPointsSeller(card.shelterId, card.deliveryPoints[0])
                setDeliveryPoints(response.data)
            }
        }

        getCard()
    }, [orderStore.cards[0]?.card.deliveryPoints])

    const deliveryCities = useMemo(() => {
        if (selectedDelivery === 'express') {
            return EXPRESS_POINTS.map(city => ({
                value: city,
                label: city,
                price: 0
            })) as unknown as TCity[]
        }

        if (!orderStore?.deliveryCities) {
            return []
        }

        return orderStore?.deliveryCities.map(city => ({
            value: city.city,
            label: city.city,
            price: city.price
        }))
    }, [orderStore?.deliveryCities, selectedDelivery])


    useEffect(() => {

    }, [orderStore])

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

    useEffect(() => {
        const deliveryCities = orderStore?.deliveryCities || [];

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
    }, [orderStore?.deliveryCities])

    const priceOrder = useMemo(() => {
        const priceBeforeDiscount = orderStore.cards.reduce((sum, orderType) => {
            return orderType.card?.pricesAndQuantity.priceBeforeDiscount ?
                (orderType.card.pricesAndQuantity.priceBeforeDiscount * orderType.count) : (orderType.card.pricesAndQuantity.price * orderType.count)
        }, 0)
        const discount = orderStore.cards.reduce((sum, orderType) => {
            return orderType.card?.pricesAndQuantity.priceBeforeDiscount ? (orderType.card?.pricesAndQuantity.priceBeforeDiscount - orderType.card?.pricesAndQuantity.price) * orderType.count : 0
        }, 0)
        return {
            priceBeforeDiscount,
            discount
        }
    }, [orderStore.cards])


    const finalPrice = useMemo(() => {
        if (!orderStore.cards ) {
            return 0; // По умолчанию вернем 0 или другое значение, в зависимости от вашей логики
        }
        if (!(orderStore.cards.length > 0) ) {
            return 0; // По умолчанию вернем 0 или другое значение, в зависимости от вашей логики
        }

        const deliveryCharge = (selectedDelivery === 'doorstep' && city) ? +city.price : 0;

        const totalOrderCount = orderStore.cards.reduce((sum, orderType) => sum + (orderType.card.pricesAndQuantity.price * orderType.count), 0);
        return totalOrderCount + deliveryCharge;
    }, [selectedDelivery, orderStore, city, selectedDelivery]);


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

    const sellerIds = useMemo(() => {
        return orderStore.cards.map(card => card.card.shelterId)
    }, [orderStore.cards])


    const onSubmit = (data: any) => {
        // if (selectedDelivery === 'doorstep') {
        //     setErrorCity(true)
        //     return
        // }

        if (!orderStore.marketDelivery
            && !isActiveButton
        ) return
        const id = createIdOrder();
        const point = deliveryPoints[checkedBoxes.findIndex(box => box)]
        if (data.delivery === 'pickup' && !point) return;

        const orderTypes = orderStore.cards.map(card => {
            return {
                goodName: card.card?.information.name,
                typeId: card?.currentType?._id,
                goodPhoto: card.card?.mainPhoto,
                goodId: card.card?._id,
                price: finalPrice - ((city && selectedDelivery === 'doorstep') ? +city.price : 0),
                count: card.count || 1,
                shelterId: card.card?.shelterId,
            }
        })

        const order = {
            orderId: id,
            orderTypes: orderTypes,
            price: finalPrice - ((city && selectedDelivery === 'doorstep') ? +city.price : 0),
            shelterIds: sellerIds,
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
            isTdMarket: orderStore?.marketDelivery !== 'self-delivery'
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

        if (data.delivery === 'pickup') {
            order.pointId = point._id
        }

        localStorage.setItem('id-order', id.split(' ')[1])
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.agroprombank.com/payments/PaymentStart';

        const parameters = [
            { name: 'MerchantLogin', value: '000209' },
            { name: 'nivid', value: id },
            { name: 'istest', value: '0' },
            { name: 'RequestSum', value: `${finalPrice * 100}` },
            // { name: 'RequestSum', value: `5` },
            { name: 'RequestCurrCode', value: '000' },
            { name: 'Desc', value: `Оплата заказа №${id.split('_')[1]}` },
        ];

        parameters.forEach(({ name, value }) => {
            form.appendChild(createHiddenInput(name, value));
        });

        const signature = `000209:${id}:0:${parameters[3].value}:000:${parameters[5].value}:HBmWYiyiwWrCsYlsD6Qk`;
        localStorage.setItem('SignatureValue', JSON.stringify({...order}))
        form.appendChild(createHiddenInput('SignatureValue', CryptoJS.MD5(signature).toString()));

        document.body.appendChild(form);

        if (
            data.delivery === 'pickup' && data?.paymentMethod === 'cash'
        ) {
            navigate('/success')
        } else {
            form.submit();
        }
    };

    const isDoorstepDelivery = watch('delivery');
    const isPaymentMethod = watch('paymentMethod');

    const streetValidation = register('street', {
        required: isDoorstepDelivery === 'doorstep' ? 'Улица обязательна' : false,
    });
    const houseValidation = register('house', {
        required: isDoorstepDelivery === 'doorstep' ? 'Дом обязателен' : false,
    });

    const handleCheckboxChange = (index: number) => (checked: boolean) => {
        const falseBox = checkedBoxes.map(item => false)
        const newCheckedBoxes = [...falseBox];
        newCheckedBoxes[index] = checked;
        setCheckedBoxes(newCheckedBoxes);
    };


    return (
        <form className={'order'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'order__title'}>Оформление заказа</h3>
            <div className={'order__container'}>
                <div className={'order__ordering'}>
                    <div className={'order__radio'}>
                        <p className={`label order__label_up ${errors.delivery ? 'error' : ''}`}>Выберите способ доставки*</p>
                        {orderStore && sellerIds.length === 1 && orderStore.cards[0]?.card.deliveryPoints.length > 0 && <div className={'wrapper-radio'}>
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
                    {selectedDelivery !== 'pickup' && <div>
                        <label
                               className={`label order__label_up`}>Выберите {selectedDelivery === 'express' ? 'место' : 'город'} доставки</label>
                        <Controller
                            name="city" // Укажите имя поля, которое будет использоваться в react-hook-form
                            control={control} // Передайте объект control из useForm
                            render={({field}) => (
                                <Select
                                    key={field.name}
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
                    </div>}
                    {selectedDelivery === 'pickup' &&
                        <div className={'order__inputs'}>
                            <label className={'label order__label_title'}
                                   htmlFor="street">Выберите пункт выдачи товара:
                            </label>
                            {
                                deliveryPoints.map((point, index) => (
                                    <DeliveryPoint key={index} point={point} index={index} handleCheckboxChange={handleCheckboxChange} checkedBoxes={checkedBoxes}/>
                                ))
                            }
                        </div>
                    }
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
                <div className={'order-payment'}>
                    <div className={'cart-ordering'}>
                        <h4 className={'order__subtitle'}>Ваш заказ</h4>
                        <div className={'cart-ordering__price'}>
                        <span>
                            Товары, {orderStore.cards.reduce((sum, orderType) => (sum + orderType.count), 0) || 1}
                        </span>
                            <span>{priceOrder.priceBeforeDiscount} RUP</span>
                        </div>
                        {priceOrder.discount > 0 && <div className={'cart-ordering__price'}>
                        <span>
                            Скидка
                        </span>
                            <span>{priceOrder.discount} RUP</span>
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
                            {
                                isPaymentMethod === 'cash' && <p className={'cart-ordering__warning'}>
                                    Оплата наличными при получении
                                </p>
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
