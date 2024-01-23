import React, {useEffect, useState} from 'react';
import './box-seller.scss'
import {UserService} from "../../../services/UserService";
import {useParams} from "react-router-dom";
import {ISellerByUser} from "../../../models/response/ISellerByUser";
import {API_URL} from "../../../http";

const BoxSeller = () => {
    const { name } = useParams();
    const [seller, setSeller] = useState<ISellerByUser>()

    useEffect(() => {
        const fetchSeller = async () => {
            if (name) {
                try {
                    const response = await UserService.getSeller(name);
                    setSeller(response.data)
                } catch (error) {
                    console.error("Error fetching card:", error);
                }
            }

        };

        fetchSeller();
    }, []);

    return (
        <div className={'box-seller'}>
            <div className={'box-seller__header'}>
                <div className={'box-seller__icon'}>
                    <img src={`${API_URL}${seller?.imageShop}`} alt="Иконка продавца"/>
                </div>
                <h2 className={'box-seller__title'}>{seller?.shop.nameMarket}</h2>
                <p className={'box-seller__count'}>
                    {seller?.countGoods === 1 && '1 товар'}
                    {seller && seller?.countGoods < 5  && seller?.countGoods > 1 && `${seller.countGoods} товара`}
                    {seller && seller?.countGoods > 5 && `${seller.countGoods} товаров`}
                </p>
            </div>
            {seller?.shop.description && <p className={'box-seller__description'}
                dangerouslySetInnerHTML={{__html: seller?.shop.description.replace(/\n/g, '<br>')}}/>}
        </div>
    );
};

export default BoxSeller;