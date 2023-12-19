import React, {useEffect, useState} from 'react';
import './admin-delivery.scss'
import {IOrderRes} from "../../../models/IOrder";
import {AdminService} from "../../../services/AdminService";

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

    useEffect(() => {
        console.log('marketDeliveryOrders', marketDeliveryOrders)
    }, [marketDeliveryOrders])

    return (
        <main className={'admin-delivery'}>
            <div>
                <h3>
                    Доставляются силами продавца
                </h3>
            </div>
            <div>
                <h3>
                    Доставляются силами td-market
                </h3>
            </div>
        </main>
    );
};

export default AdminDelivery;
