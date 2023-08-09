import React from 'react';
import './cart-card.scss'
import {ICartRes} from "../../../models/response/ICartRes";
import {API_URL} from "../../../http";

interface IProps {
    cart: ICartRes
}

const CartCard = ({cart}: IProps) => {
    return (
        <div className={'cart-card'}>
            <div className={'cart-card__image'}>
                <img src={`${API_URL}${cart.mainPhoto}`} alt=""/>
            </div>
            <div>
                <p>
                    {cart.name}
                </p>
            </div>
        </div>
    );
};

export default CartCard;