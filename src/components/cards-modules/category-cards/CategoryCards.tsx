import React, {useMemo, useState} from 'react';
import {IProductCard} from "../../../models/IProductCard";
import {GoodsService} from "../../../services/GoodsService";
import {useParams} from "react-router-dom";
import ProductCard from "../../cards/product-card/ProductCard";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import TitleCards from "../../title-cards/TitleCards";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {filterSlice} from "../../../store/reducers/filter/FilterSlice";


interface CategoryCardsProps {
    id?: string;
    title?: string;
    limit: number;
}

const CategoryCards = ({ id, title, limit, }: CategoryCardsProps) => {
    const { id: paramsId } = useParams();
    const {
        currentMinPrice, currentMaxPrice
    } = useAppSelector(state => state.filterReducer)
    const [categoryCards, setCategoryCards] = useState<IProductCard[]>([]);
    const [page, setPage] = useState(1);
    const [prevParamsId, setPrevParamsId] = useState<string | undefined>(paramsId);
    const dispatch = useAppDispatch()

    const fetchCategoryCards = async () => {
        try {
            const categoryId = id || paramsId;
            if (categoryId) {
                const response = await GoodsService.getCategoryGoods
                (
                    categoryId, page, limit, currentMinPrice, currentMaxPrice
                );
                if (prevParamsId !== paramsId) {

                    setCategoryCards(response.data.productCards); // Заменяем categoryCards новыми данными
                } else {
                    setCategoryCards(prevCards => [...prevCards, ...response.data.productCards]); // Добавляем новые карточки
                }
                dispatch(filterSlice.actions.setRange({
                    maxPriceRange: response.data.maxPriceRange,
                    minPriceRange: response.data.minPriceRange,
                }))
                dispatch(filterSlice.actions.setCurrentMaxPrice(response.data.maxPriceRange))
                dispatch(filterSlice.actions.setCurrentMinPrice(response.data.minPriceRange))

            }
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    };

    const handleButtonClick = () => {
        setPage(prevPage => {
            return prevPage + 1;
        });
    };

    useMemo(() => {
        setPrevParamsId(paramsId);
        fetchCategoryCards();
    }, [id, paramsId, page]); // Используем useMemo для оптимизации вызова fetchCategoryCards

    return (
        <div>
            {title && <TitleCards text={title}/>}
            <WrapperCard cardsLength={categoryCards.length} handleButtonClick={handleButtonClick} limit={limit}>
                {categoryCards.length > 0 &&
                    categoryCards.map((card, index) => <ProductCard card={card} key={index} />)}
            </WrapperCard>
        </div>
    );
};

export default CategoryCards;
