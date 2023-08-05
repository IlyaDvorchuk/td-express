import React, {useEffect, useMemo, useState} from 'react';
import {AdminService} from "../../../services/AdminService";
import {IProductCardRes} from "../../../models/IProductCard";

const ModerationGood = () => {
    const [
        moderationGoods,
        setModerationGoods
    ] = useState<IProductCardRes[]>([])

    const fetchModerationGood = async () => {
        try {
            const response = await AdminService.fetchModerationGoods();

            setModerationGoods(response.data)
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    }

    useMemo(() => {
        fetchModerationGood()
    }, [])

    useEffect(() => {
        console.log('moderationGoods', moderationGoods)
    }, [moderationGoods])

    return (
        <div>
            
        </div>
    );
};

export default ModerationGood;