import React, {useEffect, useState} from 'react';
import './box-orders.scss'
import Select from "react-select";
import {OrderEnum} from "../../../models/enums";
import {IOrderRes} from "../../../models/IOrder";
import OrderCard from "../../cards/order-card/OrderCard";
import {ShelterService} from "../../../services/ShelterService";

const ordersOptions = [
    {
        value: OrderEnum.DEFAULT,
        label: 'все'
    },
    {
        value: OrderEnum.COMPLETED,
        label: 'завершённые'
    },
    {
        value: OrderEnum.AWAITING_CONFIRMATION,
        label: 'ждут подтверждения'
    },
    {
        value: OrderEnum.AWAITING_SHIPMENT,
        label: 'ждут отправки'
    },
    {
        value: OrderEnum.DELIVERY,
        label: 'отправленные'
    },
]

const BoxOrders = () => {
    const [ordersSeller, setOrdersSeller] = useState<IOrderRes[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrderRes[]>([]);
    const [selectedStatus, setSelectedStatus] = useState({
        value: OrderEnum.DEFAULT,
        label: 'все'
    });

    useEffect(() => {
        const fetchSellerOrders = async () => {
            try {
                const response = await ShelterService.getOrdersOfSeller();
                setOrdersSeller(response.data);
            } catch (error) {
                console.log('Ошибка при получении карточек товаров:', error);
            }
        };

        fetchSellerOrders();
    }, [])

    useEffect(() => {
        if (selectedStatus.value !== OrderEnum.DEFAULT) {
            setFilteredOrders(ordersSeller.filter(order => order.status === selectedStatus.value))
        } else {
            setFilteredOrders(ordersSeller)
        }
    }, [ordersSeller, selectedStatus])

    const onChangeStatus = (e: any) => {
        const {value} = e
        const option = ordersOptions.find(opt => opt.value === value)
        if (option) setSelectedStatus(option)
    }


    return (
        <div className={'orders'}>
            <div className={'orders__select'}>
                <div className={'select'}>
                    <span className={'select__label'}>Показать товары:</span>
                    <Select
                        options={ordersOptions}
                        defaultValue={ordersOptions[0]}
                        className={'select-input select-input__orders'}
                        classNamePrefix={'select'}
                        onChange={onChangeStatus}
                    />
                </div>
            </div>
            {<div className={'orders__titles'}>
                <h4 className={'orders__title orders__title_first'}>
                    Товар
                </h4>
                <h4 className={'orders__title'}>
                    Покупатель
                </h4>
                <h4 className={'orders__title'}>
                    Цена
                </h4>
                <h4 className={'orders__title'}>
                    Кол-во
                </h4>
                <h4 className={'orders__title'}>
                    Оплата
                </h4>
                <h4 className={'orders__title'}>
                    Доставка
                </h4>
                <h4 className={'orders__title'}>
                    Адрес доставки
                </h4>
                <h4 className={'orders__title'}>
                    Статус
                </h4>
            </div>}
            <div className={'orders-wrapper'}>
                {filteredOrders.map((order, index) => (
                    <OrderCard order={order} key={order._id} isEven={index % 2 === 0}/>
                ))}
            </div>
        </div>
    );
};

export default BoxOrders;
