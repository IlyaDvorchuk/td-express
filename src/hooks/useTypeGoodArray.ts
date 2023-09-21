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

                    const modifiedArray = valuesArray.map((elem) => {
                        if (elem !== null && typeof elem === "object" && "name" in elem && typeof elem.name === "string") {
                            return elem.name; // Если элемент не равен null и имеет свойство name, считаем его IColor
                        } else {
                            return elem; // В противном случае оставляем элемент без изменений
                        }
                    });
                    // @ts-ignore
                    setTypeGoodArray(modifiedArray);
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
