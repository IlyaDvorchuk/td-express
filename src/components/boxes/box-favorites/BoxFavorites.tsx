import React, {useEffect, useState} from 'react';
import './box-favorites.scss'
import {IProductCardRes} from "../../../models/IProductCard";
import {UserService} from "../../../services/UserService";
import Select from "react-select";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import ProductCard from "../../cards/product-card/ProductCard";
import {Link} from "react-router-dom";

const BoxFavorites = () => {
    const [favoriteCards, setFavoriteCards] = useState<IProductCardRes[]>([]);

    useEffect(() => {
        const fetchFavoriteCards = async () => {
            try {
                const response = await UserService.getFavorites();
                setFavoriteCards(response.data);
            } catch (error) {
                console.log('Ошибка при получении карточек товаров:', error);
            }
        };

        fetchFavoriteCards();
    }, []);

    if (favoriteCards.length > 0) {
        return (
            <div className={'favorites'}>
                <div className={'favorites__header'}>
                    <h4>Мои желания</h4>
                    <div className={'select'}>
                        <span className={'select__label'}>Показать товары:</span>
                        <Select
                            // options={goodsOptions}
                            // defaultValue={goodsOptions[0]}
                            className={'select-input favorites__select-input'}
                            classNamePrefix={'select'}
                            isSearchable={false}
                        />
                    </div>
                </div>
            <WrapperCard limit={6}>
                {favoriteCards.map(card => (
                    <ProductCard card={card} key={card._id} isFavoriteCard={true}/>
                ))}
            </WrapperCard>
            </div>
        );
    } else
        return <div className={'favorites_empty'}>
            <h3 className={'favorites_empty__title'}>
                В избранном пусто
            </h3>
            <div className={'favorites_empty__inf'}>
                <span>Добавь товар с помощью</span>
                <img
                    src="/images/svg/favorite-button.svg"
                    alt="Добавить в фавориты"
                />
            </div>
            <Link to={'/'} className={'button button_dark favorites_empty__button'}>
                <img src="/images/svg/cart-little.svg" alt="За покупками"/>
                За покупками
            </Link>

        </div>

};

export default BoxFavorites;
