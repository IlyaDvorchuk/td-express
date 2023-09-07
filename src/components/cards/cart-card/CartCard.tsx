import React, {useEffect, useRef, useState} from 'react';
import './cart-card.scss'
import {ICartRes} from "../../../models/response/ICartRes";
import {API_URL} from "../../../http";
import Checkbox from "../../checkbox/Checkbox";
import {Link} from "react-router-dom";
import CountGood from "../../countGood/CountGood";
import {UserService} from "../../../services/UserService";

interface IProps {
    cart: ICartRes,
    isChecked: boolean
    onCheckboxChange:  (cart: ICartRes, isChecked: boolean) => void,
    deleteCart: (id: string) => void,
    setChangeCount:  React.Dispatch<React.SetStateAction<number>>,
}

const CartCard = ({cart, isChecked, onCheckboxChange, deleteCart, setChangeCount}: IProps) => {
    const [localChecked, setLocalChecked] = useState(false);
    const [count, setCount] = useState(cart.quantity);
    const timeoutRef = useRef<number | null>(null); // Устанавливаем тип для useRef

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

    const onSetCount = (operator: '+' | '-') => {
        setChangeCount(prev => ++prev)
        if (operator === '+') {
            // if (count >= quantity) return
            cart.quantity = count + 1
            console.log('cart', cart)

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
                <Checkbox sizes={36} isChecked={isChecked} onChange={handleCheckboxChange}/>
            </div>
            <Link to={`/card/${cart.productId}`} className={'cart-card__image'}>
                <img src={`${API_URL}${cart.mainPhoto}`} alt=""/>
            </Link>
            <div className={'cart-card__inf'}>
                <p className={'cart-card__name'}>
                    {cart.name}
                </p>
                {cart?.nameShelter && <p>
                    Продавец: {cart.nameShelter}
                </p>}
                    {cart?.size && <p className={'cart-card__type'}>
                        Размер: {cart.size}
                    </p>}
                <div className={'cart-card__buttons'}>
                    <CountGood count={count} onSetCount={onSetCount}/>
                    <p className={'cart-card__favorite'} onClick={onAddFavorites}>В избранное</p>
                    <p onClick={() => deleteCart(cart.typeId + cart.productId)}>Удалить</p>
                </div>
            </div>
            <div className={'cart-card__prices'}>
                <p className={'price'}>
                    {cart.price.price} RUP
                </p>
                {cart.price.priceBeforeDiscount > 0 && <p>
                    {cart.price.priceBeforeDiscount + ' RUP'}
                </p>}
            </div>
        </div>
    );
};

export default CartCard;
