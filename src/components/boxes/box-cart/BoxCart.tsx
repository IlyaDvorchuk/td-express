import React, {useEffect, useMemo, useState} from 'react';
import './box-cart.scss'
import {getAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";
import {ICartRes} from "../../../models/response/ICartRes";
import CartCard from "../../cards/cart-card/CartCard";
import Checkbox from "../../checkbox/Checkbox";
import {useWindowWidth} from "../../../hooks/useWindowWidth";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/redux";
import {orderSlice} from "../../../store/reducers/OrderSlice";

const BoxCart = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {createStoreOrder} = orderSlice.actions
    const [goodsCart, setGoodCart] = useState<ICartRes[]>([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [dedicatedCart, setDedicatedCart] = useState<ICartRes[]>([])
    const [changeCount, setChangeCount] = useState(0)
    const windowWidth = useWindowWidth();

    const fetchCart = async () => {
        if (!getAccessTokenUser()) return
        const response = await UserService.getCart()
        if (response?.data) {
            setGoodCart(response.data.reverse())
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const priseAll = useMemo(() => {
        return dedicatedCart.reduce((total, item) => {
            const itemPrice =( item.price.priceBeforeDiscount ? item.price.priceBeforeDiscount : item.price.price) * item.quantity;

            return total + itemPrice;
        }, 0);
    }, [dedicatedCart, changeCount])

    const priseDiscount = useMemo(() => {
        return dedicatedCart.reduce((total, item) => {
            const itemPrice = (item.price.priceBeforeDiscount ? item.price.price : item.price.priceBeforeDiscount) * item.quantity;
            if (!itemPrice) return (item.price.price * item.quantity)
            return total + itemPrice;
        }, 0);
    }, [dedicatedCart, changeCount])

    const chooseAll = () => {
        const newIsAllChecked = !isAllChecked;
        setIsAllChecked(newIsAllChecked);
        setDedicatedCart(newIsAllChecked ? [...goodsCart] : []);
    };

    const handleCartCardCheckboxChange = (cart: ICartRes, isChecked: boolean) => {
        if (isChecked) {

            setDedicatedCart(prevCart => [...prevCart, cart]);
        } else {
            setDedicatedCart(prevCart => prevCart.filter(item => item.typeId !== cart.typeId));
        }
    };

    const deleteCarts = async () => {
        if (!dedicatedCart.length) return
        try {
            console.log('dedicatedCart', dedicatedCart.map(cart => cart.typeId))
            const response = await UserService.deleteCarts(dedicatedCart.map(cart => cart.typeId))
            if (response.data) {
                setGoodCart(carts => carts.filter(cartItem => !dedicatedCart.some(dedicatedItem => dedicatedItem.typeId === cartItem.typeId)));
                setDedicatedCart([])
            }
        } catch (e) {
            console.log('Не получилось удалить')
        }
    }

    const deleteCart = async (id: string, productId: string) => {
        try {
            console.log('[id]', [id])
            const response = await UserService.deleteCarts([id])
            if (response.data) {
                setGoodCart(carts => carts.filter(cartItem => (id + productId) !== (cartItem.typeId + cartItem.productId)));
                setDedicatedCart(carts => carts.filter(cartItem => (id + productId) !== (cartItem.typeId + cartItem.productId)))
            }
        } catch (e) {
            console.log('Не получилось удалить')
        }
    }


    const onBuy = async () => {
        if (dedicatedCart.length === 0) return
        const cards = dedicatedCart.map(item => {
            let currentType = null
            if (item.card.typeQuantity) {
                currentType = item.card.typeQuantity.find(type => type._id === item.typeId)
            }
            return {
                card: item.card,
                currentType,
                count: +item.quantity
            }
        })
        const sellerIds = [...new Set(dedicatedCart.map(item => item.card.shelterId))];

        const response = await UserService.getDeliveryCart(sellerIds)

        if (typeof response.data === "string") return
        const storeOrder = {
            cards,
            deliveryCities: response.data.cities,
            marketDelivery: response.data.rate
        }
        dispatch(createStoreOrder(storeOrder))
        sessionStorage.setItem('form-order', JSON.stringify(storeOrder))
        navigate(`/buy`)
    }

    return (
        <div className={'cart'}>
            <h2 className={'cart__title'}>Ваша корзина, <span className={'cart__count'}>{goodsCart.length} {goodsCart.length === 1 ? 'Товар' : 'Товара'}</span>
                </h2>
            <div className={'cart__buttons'}>
                <div className={'cart__checkbox'}>
                    <Checkbox sizes={windowWidth > 450 ? 36 : 16} isChecked={isAllChecked} onChange={chooseAll}/>
                    <span>Выбрать всё</span>
                </div>
                <button
                    className={`button cart__button 
                    ${dedicatedCart.length === 0 ? 'button_not-active' : 'button_light'}`}
                    disabled={!(dedicatedCart.length > 0)}
                    onClick={deleteCarts}
                >
                    {dedicatedCart.length ?
                        <img src="/images/svg/cart/cart-active.svg" alt="Удаление товаров"/>
                        : <img src="/images/svg/cart/cart-not-active.svg" alt="Удаление товаров (не активно)"/>
                    }
                    Удалить
                </button>
            </div>
            <div className={'cart__container'}>
                <div className={'cart__cards'}>
                    {goodsCart.map((good, index) => (
                        <CartCard
                            cart={good}
                            key={index}
                            isChecked={dedicatedCart.some(item => (item.typeId + item.productId) === (good.typeId + good.productId))}
                            onCheckboxChange={handleCartCardCheckboxChange}
                            deleteCart={deleteCart}
                            setChangeCount={setChangeCount}
                        />
                    ))}
                </div>
                <div className={'cart-ordering'}>
                    <p className={'cart-ordering__order'}>Ваш заказ</p>
                    <div className={'cart-ordering__price'}>
                        <span>
                            Товары, {dedicatedCart.length}
                        </span>
                        <span>{priseAll.toString()} RUP</span>
                    </div>
                    <div className={'cart-ordering__price'}>
                        <span>
                            Скидка
                        </span>
                        <span>{priseAll - priseDiscount} RUP</span>
                    </div>
                    <div className={'cart-ordering__finish'}>
                        <span>
                            Итого
                        </span>
                        <span>{priseDiscount.toString()} RUP</span>
                    </div>
                    <button className={'button button_not-active cart-ordering__buttons'} onClick={onBuy}>Перейти к оформлению</button>
                </div>
            </div>

        </div>
    );
};

export default BoxCart;
