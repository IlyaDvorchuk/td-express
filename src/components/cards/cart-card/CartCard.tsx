import React, {useEffect, useRef, useState} from 'react';
import './cart-card.scss'
import {ICartRes} from "../../../models/response/ICartRes";
import Checkbox from "../../checkbox/Checkbox";
import {Link} from "react-router-dom";
import CountGood from "../../countGood/CountGood";
import {UserService} from "../../../services/UserService";
import {useWindowWidth} from "../../../hooks/useWindowWidth";

interface IProps {
    cart: ICartRes,
    isChecked: boolean
    onCheckboxChange:  (cart: ICartRes, isChecked: boolean) => void,
    deleteCart: (id: string, productId: string) => void,
    setChangeCount:  React.Dispatch<React.SetStateAction<number>>,
}

const CartCard = ({cart, isChecked, onCheckboxChange, deleteCart, setChangeCount}: IProps) => {
    const [localChecked, setLocalChecked] = useState(false);
    const [count, setCount] = useState(cart.quantity);
    const timeoutRef = useRef<number | null>(null); // Устанавливаем тип для useRef
    const windowWidth = useWindowWidth();
    const [maxCount, setMaxCount] = useState(Infinity)


    useEffect(() => {
        if (cart.card.typeQuantity) {
            const currentType = cart.card.typeQuantity.find(type => type._id === cart.typeId)
            if (currentType) {
                setMaxCount(currentType.quantity)
            }
        }
    }, [cart])


    useEffect(() => {
        if (count > maxCount) {
            setCount(maxCount)
        }
    }, [count, maxCount])

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        // Устанавливаем новый таймер для вызова UserService.setCount через 5 секунд
        timeoutRef.current = window.setTimeout(() => {
            if (count !== cart.quantity) {
                UserService.setCountCart(cart.typeId, count);
            }
        }, 3000);

        // Функция для выполнения при размонтировании
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [count, cart.quantity, cart.typeId]);

    useEffect(() => {
        setLocalChecked(isChecked);
    }, [isChecked]);

    const handleCheckboxChange = () => {
        setLocalChecked(!localChecked);
        onCheckboxChange(cart, !localChecked);
    };

    useEffect(() => {
        console.log('cart', cart)
    }, [cart])

    const onSetCount = (operator: '+' | '-') => {
        setChangeCount(prev => ++prev)
        if (operator === '+') {
            if (count > maxCount) return
            cart.quantity = count + 1

            setCount(count + 1)
        } else if (operator === '-') {
            if (count <= 1) return;
            cart.quantity = count - 1
            setCount(count - 1)
        }
    }

    const onAddFavorites = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        await UserService.addToFavorites(cart.productId)
    }

    return (
        <div className={'cart-card'}>
            <div className={'cart-card__checkbox'}>
                <Checkbox sizes={windowWidth > 450 ? 36 : 16} isChecked={isChecked} onChange={handleCheckboxChange}/>
            </div>
            <Link to={`/card/${cart.productId}`} className={'cart-card__image'}>
                <img src={`https://api.td-market.md/${cart.mainPhoto}`} alt=""/>
            </Link>
            <div className={'cart-card__inf'}>
                <div className={'cart-card__prices cart-card__prices-mobile'}>
                    <p className={'price'}>
                        {cart.price.price} RUP
                    </p>
                    {cart.price.priceBeforeDiscount > 0 && <p className={'cart-card__prices-mobile_discount'}>
                        {cart.price.priceBeforeDiscount + ' RUP'}
                    </p>}
                </div>
                <p className={'cart-card__name'}>
                    {cart.name}
                </p>
                {cart?.nameShelter && <p className={'cart-card__type'}>
                    Продавец: {cart.nameShelter}
                </p>}
                {cart?.color && <p  className={'cart-card__color'}>
                    Цвет: {cart.color}
                </p>}
                    {cart?.size && <p className={'cart-card__type cart-card__size'}>
                        Размер: {cart.size}
                    </p>}

                <div className={'cart-card__buttons'}>
                    <CountGood count={count} onSetCount={onSetCount}/>
                    {windowWidth > 530 ? <>
                        <p className={'cart-card__favorite'} onClick={onAddFavorites}>В избранное</p>
                        <p onClick={() => deleteCart(cart.typeId, cart.productId)}>Удалить</p>
                    </> :
                        <>
                            <p onClick={onAddFavorites} className={'cart-card__favorite cart-card__mobile-button'}>
                                <img src="/images/svg/cart/cart-favorite.svg" alt="В избранное"/>
                            </p>
                            <p onClick={() => deleteCart(cart.typeId, cart.productId)} className={'cart-card__mobile-button'}>
                                <img src='/images/svg/cart/cart-remove.svg' alt={'Удалить'}/>
                            </p>
                        </>
                    }
                </div>
            </div>
            <div className={'cart-card__prices'}>
                <p className={'price'}>
                    {cart.price.price} RUP
                </p>
                {cart.price.priceBeforeDiscount > 0 && <p className={'price-discount'}>
                    {cart.price.priceBeforeDiscount + ' RUP'}
                </p>}
            </div>
        </div>
    );
};

export default CartCard;
