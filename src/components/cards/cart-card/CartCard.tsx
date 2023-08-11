import React, {useEffect, useState} from 'react';
import './cart-card.scss'
import {ICartRes} from "../../../models/response/ICartRes";
import {API_URL} from "../../../http";
import Checkbox from "../../checkbox/Checkbox";

interface IProps {
    cart: ICartRes,
    isChecked: boolean
    onCheckboxChange:  (cart: ICartRes, isChecked: boolean) => void
}

const CartCard = ({cart, isChecked, onCheckboxChange}: IProps) => {
    const [localChecked, setLocalChecked] = useState(false);

    useEffect(() => {
        setLocalChecked(isChecked);
    }, [isChecked]);

    const handleCheckboxChange = () => {
        setLocalChecked(!localChecked);
        onCheckboxChange(cart, !localChecked);
    };


    return (
        <div className={'cart-card'}>
            <div className={'cart-card__checkbox'}>
                <Checkbox sizes={36} isChecked={isChecked} onChange={handleCheckboxChange}/>
            </div>
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
