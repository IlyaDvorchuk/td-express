import { useState, useEffect } from 'react';
import {GoodsService} from "../services/GoodsService";
import {IOrderRes} from "../models/IOrder";

function useTypeGoodArray(order: IOrderRes) {
    const [typeGoodArray, setTypeGoodArray] = useState<(string | number)[]>([]);

    useEffect(() => {
        const fetchType = async () => {
            try {
                const response = await GoodsService.getType(order.goodId, order.typeId);

                if (response.data) {
                    const { _id, ...rest } = response.data;

                    const valuesArray = Object.values(rest);
                    setTypeGoodArray(valuesArray);
                }
            } catch (error) {
                // Обработайте ошибку, если необходимо
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchType();
    }, [order.goodId, order.typeId]); // Добавьте зависимости, которые могут изменяться

    return typeGoodArray;
}

export default useTypeGoodArray;
