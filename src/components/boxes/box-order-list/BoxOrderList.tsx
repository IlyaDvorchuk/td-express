import React, {useEffect, useMemo, useState} from 'react';
import './box-order-list.scss'
import {IOrderRes} from "../../../models/IOrder";
import OrderUserCard from "../../cards/order-user-card/OrderUserCard";
import {useAppSelector} from "../../../hooks/redux";
import {UserService} from "../../../services/UserService";
import {OrderEnum} from "../../../models/enums";

const BoxOrderList = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const [ordersUser, setOrdersUser] = useState<IOrderRes[]>([]);
    const [activeStatus, setActiveStatus] = useState(OrderEnum.DEFAULT)

    const filteredOrders = useMemo(() => {
        if (activeStatus === OrderEnum.DEFAULT) {
            return ordersUser
        } else if (activeStatus === OrderEnum.DELIVERY) {
            return ordersUser.filter(order => order.status === OrderEnum.DELIVERY)
        } else if (activeStatus === OrderEnum.AWAITING_CONFIRMATION) {
            return ordersUser.filter(order => order.status === OrderEnum.AWAITING_SHIPMENT || order.status === OrderEnum.AWAITING_CONFIRMATION)
        } else if (activeStatus === OrderEnum.COMPLETED) {
            return ordersUser.filter(order => order.status === OrderEnum.COMPLETED)
        } else return ordersUser
    }, [activeStatus, ordersUser])

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (user?._id) {
                try {
                    console.log()
                    const response = await UserService.getOrdersOfUser(user._id);
                    setOrdersUser(response.data.reverse());
                } catch (error) {
                    console.log('Ошибка при получении карточек товаров:', error);
                }
            }

        };

        fetchUserOrders();
    }, [user])

    return (
        <div className={'orders-list'}>
            <h3 className={'orders-list__title'}>Мои заказы</h3>
            <section className={'orders-list__wrapper'}>
                <div className={'orders-list__container'}>
                    {filteredOrders.map(order => (
                        <OrderUserCard order={order} key={order._id}/>
                    ))}
                </div>
                <aside className={'orders-list__selects'}>
                    <p
                        className={`orders-list__select ${activeStatus === OrderEnum.DEFAULT ? 'active' : ''}`}
                        onClick={() => setActiveStatus(OrderEnum.DEFAULT)}
                    >
                        Все заказы&nbsp;({ordersUser.length})
                    </p>
                    <p
                        className={`orders-list__select ${activeStatus === OrderEnum.DELIVERY ? 'active' : ''}`}
                        onClick={() => setActiveStatus(OrderEnum.DELIVERY)}
                    >
                        Активные&nbsp;({ordersUser.filter(order => order.status === OrderEnum.DELIVERY).length})
                    </p>
                    <p
                        className={`orders-list__select ${(activeStatus === OrderEnum.AWAITING_CONFIRMATION || activeStatus === OrderEnum.AWAITING_SHIPMENT) ? 'active' : ''}`}
                        onClick={() => setActiveStatus(OrderEnum.AWAITING_CONFIRMATION)}
                    >
                        Ожидают отзыв&nbsp;({ordersUser.filter(order => order.status === OrderEnum.AWAITING_SHIPMENT || order.status === OrderEnum.AWAITING_CONFIRMATION).length})
                    </p>
                    <p
                        className={`orders-list__select ${activeStatus === OrderEnum.COMPLETED ? 'active' : ''}`}
                        onClick={() => setActiveStatus(OrderEnum.COMPLETED)}
                    >
                        Завершённые&nbsp;({ordersUser.filter(order => order.status === OrderEnum.COMPLETED).length})
                    </p>
                </aside>
            </section>
        </div>
    );
};

export default BoxOrderList;