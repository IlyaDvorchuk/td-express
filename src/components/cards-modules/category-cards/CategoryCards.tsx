import React, {useEffect, useMemo, useState} from 'react';
import {IProductCard} from "../../../models/IProductCard";
import {GoodsService} from "../../../services/GoodsService";
import {useParams} from "react-router-dom";
import ProductCard from "../../cards/product-card/ProductCard";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import TitleCards from "../../title-cards/TitleCards";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {filterSlice} from "../../../store/reducers/filter/FilterSlice";
import {IGetGoodsParams} from "../../../models/IFilter";


interface CategoryCardsProps {
    id?: string;
    title?: string;
    limit: number;
    isFilter?: boolean
}

const CategoryCards = ({ id, title, limit, isFilter = false }: CategoryCardsProps) => {
    const { id: paramsId } = useParams();
    const {
        currentMinPrice, currentMaxPrice, isChange, colors
    } = useAppSelector(state => state.filterReducer)
    const [categoryCards, setCategoryCards] = useState<IProductCard[]>([]);
    const [page, setPage] = useState(1);
    const [prevParamsId, setPrevParamsId] = useState<string | undefined>(paramsId);
    const dispatch = useAppDispatch()


    const fetchCategoryCards = async (isInputChange = false) => {
        try {
            const categoryId = id || paramsId;
            if (categoryId) {

                const currentMin = (prevParamsId !== paramsId) || !isFilter ? 0 : currentMinPrice
                const currentMax =  (prevParamsId !== paramsId) || !isFilter ? Infinity : currentMaxPrice
                const params: IGetGoodsParams = {
                    category: categoryId,
                    page: page,
                    limit: limit,
                    minPrice: currentMin,
                    maxPrice: currentMax,
                };

                if (Array.isArray(colors)) {
                    params.colors = colors
                }
                const response =  await GoodsService.getCategoryGoods
                (
                    params
                );
                if (prevParamsId !== paramsId || isInputChange) {
                    setCategoryCards(response.data.productCards); // Заменяем categoryCards новыми данными
                } else {
                    setCategoryCards(prevCards => [...prevCards, ...response.data.productCards]); // Добавляем новые карточки
                }
                if (isFilter && response.data.productCards.length > 0 && !isInputChange) {
                    dispatch(filterSlice.actions.setRange({
                        maxPriceRange: response.data.maxPriceRange,
                        minPriceRange: response.data.minPriceRange,
                    }))
                    dispatch(filterSlice.actions.setCurrentMaxPrice(response.data.maxPriceRange))
                    dispatch(filterSlice.actions.setCurrentMinPrice(response.data.minPriceRange))
                } else if (!isInputChange) {
                    dispatch(filterSlice.actions.setRange({
                        maxPriceRange: Infinity,
                        minPriceRange: 0,
                    }))
                    dispatch(filterSlice.actions.setCurrentMaxPrice(Infinity))
                    dispatch(filterSlice.actions.setCurrentMinPrice(0))
                    dispatch(filterSlice.actions.setColors([]))
                }
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


    useEffect(() => {
        if (isFilter && isChange) {
            fetchCategoryCards(true);
            console.log('colors', colors)
        }
    }, [isChange, isFilter, currentMinPrice, currentMaxPrice, colors])


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
