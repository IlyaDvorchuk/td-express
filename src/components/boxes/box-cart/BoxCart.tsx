import React, {useEffect, useState} from 'react';
import './box-cart.scss'
import {getAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";
import {ICartRes} from "../../../models/response/ICartRes";
import CartCard from "../../cards/cart-card/CartCard";
import Checkbox from "../../checkbox/Checkbox";

const BoxCart = () => {
    const [goodsCart, setGoodCart] = useState<ICartRes[]>([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [dedicatedCart, setDedicatedCart] = useState<ICartRes[]>([])

    const fetchCart = async () => {
        if (!getAccessTokenUser()) return
        const response = await UserService.getCart()
        setGoodCart(response.data.reverse())
    }

    useEffect(() => {

        fetchCart();
    }, []);

    const chooseAll = () => {
        const newIsAllChecked = !isAllChecked;
        setIsAllChecked(newIsAllChecked);
        setDedicatedCart(newIsAllChecked ? [...goodsCart] : []);
    };

    const handleCartCardCheckboxChange = (cart: ICartRes, isChecked: boolean) => {
        if (isChecked) {
            setDedicatedCart(prevCart => [...prevCart, cart]);
        } else {
            setDedicatedCart(prevCart => prevCart.filter(item => item._id !== cart._id));
        }
    };


    return (
        <div className={'cart'}>
            <h2 className={'cart__title'}>Ваша корзина, <span className={'cart__count'}>{goodsCart.length} {goodsCart.length === 1 ? 'Товар' : 'Товара'}</span>
                </h2>
            <div className={'cart__buttons'}>
                <div className={'cart__checkbox'}>
                    <Checkbox sizes={36} isChecked={isAllChecked} onChange={chooseAll}/>
                    <span>Выбрать всё</span>
                </div>
                <button className={`button cart__button ${dedicatedCart.length === 0 ? 'button_not-active' : 'button_light'}`} disabled={!(dedicatedCart.length > 0)}>
                    {dedicatedCart.length ?
                        <img src="/images/svg/cart/cart-active.svg" alt="Удаление товаров"/>
                        : <img src="/images/svg/cart/cart-not-active.svg" alt="Удаление товаров (не активно)"/>
                    }
                    Удалить
                </button>
            </div>
            <div className={'cart__cards'}>
                {goodsCart.map(good => (
                    <CartCard
                        cart={good}
                        key={good._id}
                        isChecked={dedicatedCart.some(item => item._id === good._id)}
                        onCheckboxChange={handleCartCardCheckboxChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoxCart;
