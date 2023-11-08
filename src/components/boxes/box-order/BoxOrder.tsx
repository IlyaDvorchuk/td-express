import React from 'react';
import './box-order.scss'
import {IOrderRes} from "../../../models/IOrder";
import {formatDateDay} from "../../../utils/formatDate";
import useTypeGoodArray from "../../../hooks/useTypeGoodArray";
import Status from "../../status/Status";

const BoxOrder = ({order}: {order: IOrderRes}) => {
    const typeGoodArray = useTypeGoodArray(order);

    return (
        <div className={'box-order'}>
            <h2 className={'box-order__title'}>Заказ № {order?.orderId?.split('_')[0]}</h2>
            <section className={'box-order__wrapper'}>
                <div>
                    <div className={'box-order__upper'}>
                        <div className={'box-order__image'}>
                            <img src={`https://api.td-market.md/${order.goodPhoto}`} alt={order.goodName}/>
                        </div>
                        <div className={'box-order__data'}>
                            <h4 className={'box-order__name'}>{order.goodName}</h4>
                            <p className={'box-order__inf'}>
                                {typeGoodArray.map((item, index) => (
                                    <span key={index}>{item}{index < typeGoodArray.length - 1  ? ', ' : ''}</span>
                                ))}
                            </p>
                            <p className={'box-order__inf'}>{order.count} шт.</p>
                            <p className={'box-order__inf box-order__date'}>
                                Дата заказа: <span>{formatDateDay(order.createdAt)}</span>
                            </p>
                            <p className={'box-order__inf box-order__last'}>
                                Статус: <span>{order.status}</span>
                            </p>
                        </div>
                        <div>
                            <Status status={order.status}/>
                            <p className={'box-order__price'}>{order.price} RUP</p>
                        </div>
                    </div>
                    <div className={'box-order__bottom'}>
                        {order.deliveryAddress && <div>
                            <h3>Адрес доставки:</h3>
                        </div>}
                        <div className={'box-order__buyer'}>
                            <h3 className={'box-order__subtitle'}>Получатель:</h3>
                            <p>{order.buyer.family} {order.buyer.name}</p>
                            <p>{order.buyer.phone}</p>
                            <button className={'button button_light box-order__button'}>
                                Изменить данные
                            </button>
                        </div>
                    </div>
                </div>
                <aside className={'box-order__aside'}>
                    <p className={'box-order__first-p'}>Вы оформили заказ {formatDateDay(order.createdAt)}</p>
                    {order.deliveryAddress && <>
                        <p>В данный момент заказ ожидает подтверждения от продавца.</p>
                        <p>Как только продавец подтвердит Ваш заказ и начнет собирать посылку, статус заказа
                            изменится.</p>
                    </>}
                </aside>
            </section>


        </div>
    );
};

export default BoxOrder;