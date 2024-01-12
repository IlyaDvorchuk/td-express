import React, {useEffect, useState} from 'react';
import './seller-cards.scss'
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import {IProductCardRes} from "../../../models/IProductCard";
import {useParams} from "react-router-dom";
import ProductCard from "../../cards/product-card/ProductCard";
import {filterSlice} from "../../../store/reducers/filter/FilterSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {GoodsService} from "../../../services/GoodsService";
import {IFilterSellerParams} from "../../../models/IFilter";

const SellerCards = () => {
    const dispatch = useAppDispatch()
    const { name } = useParams();
    const [page, setPage] = useState(1);
    const [isInputChange, setIsInputChange] = useState(false)
    const [sellerCards, setSellerCards] = useState<IProductCardRes[]>([])
    const {
        currentMinPrice, currentMaxPrice, isChange, colors, isReset
    } = useAppSelector(state => state.filterReducer)
    const {user} = useAppSelector(state => state.userReducer)

    const fetchSellerCards = async (isChange?: boolean) => {
        if (name) {
            try {

                if (isChange) {
                    setIsInputChange(true)

                }
                const currentMin = !isChange ? 0 : currentMinPrice
                const currentMax =  !isChange ? Infinity : currentMaxPrice
                const params: IFilterSellerParams = {
                    name,
                    page,
                    limit: 32,
                    minPrice: currentMin,
                    maxPrice: currentMax,
                    userId: user?._id
                };
                if (Array.isArray(colors) && isChange) {
                    params.colors = colors
                }
                console.log('params', params)

                const response = await GoodsService.getSellerCards(params);
                setSellerCards(response.data.productCards)
                if (response.data.productCards.length > 0 && !isChange) {
                    dispatch(filterSlice.actions.setRange({
                        maxPriceRange: response.data.maxPriceRange,
                        minPriceRange: response.data.minPriceRange,
                    }))
                    dispatch(filterSlice.actions.setCurrentMaxPrice(response.data.maxPriceRange))
                    dispatch(filterSlice.actions.setCurrentMinPrice(response.data.minPriceRange))
                } else if (!isChange) {
                    dispatch(filterSlice.actions.setRange({
                        maxPriceRange: Infinity,
                        minPriceRange: 0,
                    }))
                    dispatch(filterSlice.actions.setCurrentMaxPrice(Infinity))
                    dispatch(filterSlice.actions.setCurrentMinPrice(0))
                    dispatch(filterSlice.actions.setColors([]))
                }
                setIsInputChange(false)
            } catch (error) {
                console.log('Ошибка при получении карточек товаров:', error);
            }
        }

    }

    useEffect(() => {


        fetchSellerCards()
    }, [])

    useEffect(() => {
        console.log('currentMinPrice', currentMinPrice)
        console.log('currentMaxPrice', currentMaxPrice)
        console.log('isChange', isChange)
        if (isChange && !isReset && !isInputChange) {
            fetchSellerCards(true);
        }
    }, [isChange, currentMinPrice, currentMaxPrice, colors, isReset])

    return (
        <div>
            <WrapperCard limit={32}>
                {sellerCards.map((card) => (
                    <ProductCard card={card} key={card._id}/>
                ))}
            </WrapperCard>
        </div>
    );
};

export default SellerCards;
