import { useState, useEffect } from 'react';
import {GoodsService} from "../services/GoodsService";
import {OrderType} from "../models/IOrder";

function useTypeGoodArray(orderTypes: OrderType[]) {
    const [typeGoodArray, setTypeGoodArray] = useState<(string | number)[]>([]);

    useEffect(() => {
        const fetchType = async () => {
            try {
                // Можете использовать forEach, map или другой способ в зависимости от вашей структуры данных
                for (const orderType of orderTypes) {
                    const response = await GoodsService.getType(orderType.goodId, orderType.typeId);

                    if (response.data) {
                        const { _id, quantity, ...rest } = response.data;

                        const valuesArray = Object.values(rest);

                        const modifiedArray = valuesArray.map((elem) => {
                            if (elem !== null && typeof elem === "object" && "name" in elem && typeof elem.name === "string") {
                                return elem.name; // Если элемент не равен null и имеет свойство name, считаем его IColor
                            } else {
                                return elem; // В противном случае оставляем элемент без изменений
                            }
                        });
                        // @ts-ignore
                        setTypeGoodArray((prevArray) => [...prevArray, ...modifiedArray]);
                    }
                }
            } catch (error) {
                // Обработайте ошибку, если необходимо
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchType();
    }, [orderTypes]); // Зависимость изменена на orderTypes

    return typeGoodArray;
}

export default useTypeGoodArray;
