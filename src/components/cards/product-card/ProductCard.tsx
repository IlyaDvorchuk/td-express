import React, {useState} from 'react';
import './product-card.scss'
import '../../../styles/elements/buttons.scss'
import {IProductCard} from "../../../models/IProductCard";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../../http";
import {UserService} from "../../../services/UserService";

interface IProductCardProps {
    card: IProductCard,
    isFavoriteCard?: boolean
}

const ProductCard = ({card, isFavoriteCard = false}: IProductCardProps) => {
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(isFavoriteCard)

    const onClickCard = () => {
        navigate(`/card/${card._id}`, {
            state: {
                ...card
            }
        })
        window.scrollTo({top: 60, behavior: 'smooth'})
    }

    const onAddFavorites = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const response = await UserService.addToFavorites(card._id)
        if (response) setIsFavorite(true)
    }

    return (
        <div className={'card'} onClick={onClickCard}>
            <div className={'card__favorites'} onClick={onAddFavorites}>
                {!isFavorite ?
                    <img
                        src="/images/svg/favorite-button-add.svg"
                        alt="Добавить в фавориты"
                    />
                    :
                    <img
                        src="/images/svg/favorite-button.svg"
                        alt="Добавлено в фавориты"
                    />
                }

            </div>
            <div className={'card-image'}>
                <img src={`${API_URL}${card.mainPhoto}`} alt={card.information.name}/>
            </div>
            <div className={'card__price'}>
                <span className={'price'}>
                    {card.pricesAndQuantity.price} RUP
                </span>
                {
                    card.pricesAndQuantity.priceBeforeDiscount > 0 &&
                    <span className={'discount'}>{card.pricesAndQuantity.priceBeforeDiscount} RUP</span>
                }
            </div>
            <h4 className={'card-name'} title={card.information.name}>
                {card.information.name}
            </h4>
            <button className={'button button_dark card__button'}>
                В корзину
            </button>
        </div>
    );
};

export default ProductCard;
