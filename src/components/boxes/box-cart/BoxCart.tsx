import React, {useEffect, useState} from 'react';
import {getAccessTokenUser} from "../../../utils/tokens";
import {UserService} from "../../../services/UserService";

const BoxCart = () => {
    const [goodsCart, setGoodCart] = useState([])

    const fetchCart = async () => {
        if (!getAccessTokenUser()) return
        const response = await UserService.getCart()
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div>
            <h2>Ваша корзина, </h2>
        </div>
    );
};

export default BoxCart;