import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {IProductCardRes} from "../models/IProductCard";
import {GoodsService} from "../services/GoodsService";
import {IOrderRes} from "../models/IOrder";
import {UserService} from "../services/UserService";

const useFetchOrder = (): IOrderRes | null => {
    const location = useLocation();
    const { id } = useParams();
    const [order, setOrder] = useState<IOrderRes | null>(null);

    useEffect(() => {
        const fetchCard = async () => {
            if (location.state) {
                setOrder(location.state);
            } else if (id) {
                try {
                    const fetchedCard = await UserService.getOrder(id);
                    setOrder(fetchedCard.data);
                } catch (error) {
                    console.error("Error fetching card:", error);
                }
            }
        };

        fetchCard();
    }, [id, location.state]);
    console.log('order', order)
    return order;
};

export default useFetchOrder;