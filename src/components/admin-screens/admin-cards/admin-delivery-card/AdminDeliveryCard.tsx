import React, {useEffect, useState} from 'react';
import './admin-delivery-card.scss'
import {IOrderRes} from "../../../../models/IOrder";
import {AdminService} from "../../../../services/AdminService";
import {ISellerByAdmin} from "../../../../models/response/ISellerByAdmin";
import {formatDate} from "../../../../utils/formatDate";
import classNames from "classnames";
import {OrderEnum} from "../../../../models/enums";
import {ShelterService} from "../../../../services/ShelterService";

interface IProps {
    order: IOrderRes,
    isMarket?: boolean
}

const AdminDeliveryCard = ({order, isMarket = false}: IProps) => {
    const [seller, setSeller] = useState<ISellerByAdmin>()
    const [status, setStatus] = useState<OrderEnum>(order.status)

    useEffect(() => {
        const fetchSeller = async () => {
                try {
                    const response = await AdminService.getSeller(order.shelterId);
                    setSeller(response.data)
                } catch (error) {
                    console.error("Error fetching seller:", error);
                }

        };

        fetchSeller();
    }, []);

    const onChangeStatus = async (status: OrderEnum) => {
        let newStatus: OrderEnum
        let text;
        if (status === OrderEnum.AWAITING_CONFIRMATION) {
            newStatus = OrderEnum.AWAITING_SHIPMENT
            text = `Ваш товар <b>${order.goodName}</b> ожидает отправки`
        } else if (status === OrderEnum.AWAITING_SHIPMENT) {
            newStatus = OrderEnum.DELIVERY
            text = `Ваш товар  <b>${order.goodName}</b> доставляется`
        } else if (status === OrderEnum.DELIVERY) {
            newStatus = OrderEnum.COMPLETED
            text = `Ваш товар <b>${order.goodName}</b> доставлен`
        } else return
        const response = await ShelterService.changeStatus(order._id, newStatus)
        if (order.userId) {
            await AdminService.createNotification(order.userId, text, true)
        }
        if (response.data) {
            order.status = newStatus
            setStatus(newStatus)
        }
    }

    const daysHavePassed = (dateString : string) => {
        const parsedDate = new Date(dateString);
        const currentDate = new Date();

        const timeDifferenceInMilliseconds = currentDate.getTime() - parsedDate.getTime();
        return Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    }

    return (
        <div className={`admin-delivery-card ${isMarket ? 'market' : ''}`}>
            <div className={'admin-delivery-card__header'}>
                <div className={'admin-delivery-card__image'}>
                    <img src={`https://api.td-market.md/${order.goodPhoto}`} alt=""/>`
                </div>
                <div className={'admin-delivery-card__seller'}>
                    <p>Продавец: {seller?.nameShop}</p>
                    <p>Прошло дней: {daysHavePassed(order.createdAt)}</p>
                    <p>Имя продавца: {seller?.name}</p>
                    <p>Email продавца: {seller?.email}</p>
                    <p>Дата покупки: {formatDate(order.createdAt)}</p>
                    <p>Телефон продавца: {seller?.phone}</p>
                    {seller?.closePhone &&  <p>Телефон близкого: {seller?.closePhone}</p>}
                </div>
            </div>

            <h4>Информация о покупателе:</h4>
            <div className={'admin-delivery-card__block'}>
                <p>Имя: {order.buyer.name}</p>
                <p>Фамилия: {order.buyer.family}</p>
                <p>Телефон: {order.buyer.phone}</p>
            </div>
            <p>Способ доставки: {order.deliveryMethod === 'pickup' ? 'Самовывоз' :
                order.deliveryMethod === 'express' ? 'Экспресс почтой' : 'Доставка до двери'}</p>
            {order.deliveryMethod === 'doorstep' && <>
                <h4>Адрес доставки:</h4>
                <div className={'admin-delivery-card__block'}>
                    <p>Улица: {order.deliveryAddress?.street}</p>
                    <p>Дом: {order.deliveryAddress?.house}</p>
                    {order.deliveryAddress?.floor && <p>Этаж: {order.deliveryAddress?.floor}</p>}
                    {order.deliveryAddress?.entrance && <p>Подъезд: {order.deliveryAddress?.entrance}</p>}
                </div>
                {order.deliveryAddress?.comment && <>
                    <h4>Комментарий для курьера:</h4>
                    <p>{order.deliveryAddress?.comment}</p>
                </>}
                <p>Стоимость доставки: {order.deliveryAddress?.deliveryPrice} руб</p>

            </>}
            <div className={classNames('status_back', {
                'status_green_back': status === OrderEnum.COMPLETED,
                'status_yellow_back': status === OrderEnum.AWAITING_CONFIRMATION || status === OrderEnum.AWAITING_SHIPMENT,
                'status_violet_back': status === OrderEnum.DELIVERY,
            })}>
                {status}
            </div>
            {status !== OrderEnum.COMPLETED && <button
                onClick={() => onChangeStatus(status)}
                className={
                    `button button_light admin-delivery-card__button ${status === OrderEnum.AWAITING_CONFIRMATION ? 'confirmation' : ''}`
                }
            >
                {status === OrderEnum.AWAITING_CONFIRMATION && 'ПОДТВЕРДИТЬ ЗАКАЗ'}
                {status === OrderEnum.AWAITING_SHIPMENT && 'ПОДТВЕРДИТЬ ОТПРАВКУ'}
                {status === OrderEnum.DELIVERY && 'ПОДТВЕРДИТЬ ДОСТАВКУ'}
            </button>}
        </div>
    );
};

export default AdminDeliveryCard;