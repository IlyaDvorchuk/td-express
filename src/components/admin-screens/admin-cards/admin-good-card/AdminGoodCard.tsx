import React from 'react';
import './admin-good-card.scss'
import {IProductCardRes} from "../../../../models/IProductCard";
import {API_URL} from "../../../../http";

interface IProps {
    good: IProductCardRes
}

const AdminGoodCard = ({good}: IProps) => {
    return (
        <div>
            <img src={`${API_URL}${good.mainPhoto}`} alt={good.information.name}/>
            <div>
                <div>
                    Дата публикацииЖ {good.createdAt}
                </div>
            </div>
        </div>
    );
};

export default AdminGoodCard;