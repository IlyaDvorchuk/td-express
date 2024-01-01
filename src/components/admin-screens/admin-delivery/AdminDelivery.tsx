import React, {useEffect, useState} from 'react';
import './admin-delivery.scss'
import {IOrderRes} from "../../../models/IOrder";
import {AdminService} from "../../../services/AdminService";
import AdminDeliveryCard from "../admin-cards/admin-delivery-card/AdminDeliveryCard";

const AdminDelivery = () => {
    const [marketDeliveryOrders, setMarketDeliveryOrders] = useState<IOrderRes[]>([])
    const [sellerDeliveryOrders, setSellerDeliveryOrders] = useState<IOrderRes[]>([])

    useEffect(() => {
        const fetchOrders = async () => {
            const responseMarket = await AdminService.getMarketOrders()
            const responseSeller = await AdminService.getSellerOrders()
            if (responseMarket?.data) {
                setMarketDeliveryOrders(responseMarket.data)
            }
            if (responseSeller?.data) {
                setSellerDeliveryOrders(responseSeller.data)
            }
        }

        fetchOrders()
    }, [])

    return (
        <main className={'admin-delivery'}>
            <div>
                <h3>
                    Доставляются силами продавца
                </h3>
                <div>
                    {sellerDeliveryOrders.map(order => (
                        <AdminDeliveryCard order={order} key={order._id}/>
                    ))}
                </div>
            </div>
            <div>
                <h3>
                    Доставляются силами td-market
                </h3>
                {marketDeliveryOrders.map(order => (
                    <AdminDeliveryCard order={order} key={order._id} isMarket={true}/>
                ))}
            </div>
        </main>
    );
};

export default AdminDelivery;
