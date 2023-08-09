import React, {useEffect, useState} from 'react';
import './box-cart.scss'
import {getAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";
import {ICartRes} from "../../../models/response/ICartRes";
import CartCard from "../../cards/cart-card/CartCard";

const BoxCart = () => {
    const [goodsCart, setGoodCart] = useState<ICartRes[]>([])

    const fetchCart = async () => {
        if (!getAccessTokenUser()) return
        const response = await UserService.getCart()
        setGoodCart(response.data.reverse())
        console.log('response fetchCart', response)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className={'cart'}>
            <h2 className={'cart__title'}>Ваша корзина, <span className={'cart__count'}>{goodsCart.length} {goodsCart.length > 1 ? 'Товара' : 'Товар'}</span>
                </h2>
            <div>

            </div>
            <div className={'cart__cards'}>
                {goodsCart.map(good => (
                    <CartCard cart={good} key={good._id}/>
                ))}
            </div>
        </div>
    );
};

export default BoxCart;