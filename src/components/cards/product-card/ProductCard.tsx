import React, {useEffect, useState} from 'react';
import './product-card.scss'
import '../../../styles/elements/buttons.scss'
import {IProductCardRes} from "../../../models/IProductCard";
import {Link} from "react-router-dom";
import {UserService} from "../../../services/UserService";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {PopupEnum} from "../../../models/enums";
import {isObjectEmpty} from "../../../utils/isObjectEmpty";

interface IProductCardProps {
    card: IProductCardRes,
    isFavoriteCard?: boolean
}

const ProductCard = ({card, isFavoriteCard = false}: IProductCardProps) => {
    const dispatch = useAppDispatch()
    const {setPopup} = userSlice.actions
    const {user, } = useAppSelector(state => state.userReducer)
    const [isFavorite, setIsFavorite] = useState(isFavoriteCard)

    useEffect(() => {
        if (card?.isFavorite) {
            setIsFavorite(true)
        }
    }, [card?.isFavorite])

    const onClickCard = () => {
        window.scrollTo({top: 60, behavior: 'smooth'})
    }

    const onAddFavorites = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (isObjectEmpty(user)) {
            dispatch(setPopup(PopupEnum.ADD_FAVORITE_NOT_USER))
        }
        const response = await UserService.addToFavorites(card._id)
        if (response?.status === 200) {
            console.log('response', response)
            dispatch(setPopup(PopupEnum.ADD_FAVORITE))
        }
        setIsFavorite(true)

    }

    const onRemoveFavorites = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (!isObjectEmpty(user)) {
            await UserService.deleteFavorites(card._id)
        }
        setIsFavorite(false)
    }

    return (
        <div className={'card'}>
            <div className={'card__favorites'}
                 onClick={(e) => isFavorite ? onRemoveFavorites(e) : onAddFavorites(e)}>
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
            <Link to={`/card/${card._id}`} state={{ ...card }} onClick={onClickCard}>

                <div className={'card-image'}>
                    <img src={`https://api.td-market.md/${card.mainPhoto}`} alt={card.information.name}/>
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
            </Link>
        </div>
    );
};

export default ProductCard;
