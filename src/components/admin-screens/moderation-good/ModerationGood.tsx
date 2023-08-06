import React, {useMemo, useState} from 'react';
import {AdminService} from "../../../services/AdminService";
import {IProductCardRes} from "../../../models/IProductCard";
import Title from "../title/Title";
import AdminGoodCard from "../admin-cards/admin-good-card/AdminGoodCard";

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

    return (
        <div className={'moderation-shelter'}>
            <Title>Модерация объявлений</Title>
            <div className={'good-admin-container'}>
                {
                    moderationGoods.map(good => (
                        <AdminGoodCard good={good} key={good._id}/>
                    ))
                }
            </div>
        </div>
    );
};

export default ModerationGood;