import React, {useMemo, useState} from 'react';
import {IProductCard} from "../../../models/IProductCard";
import {GoodsService} from "../../../services/GoodsService";
import {useParams} from "react-router-dom";
import ProductCard from "../../cards/product-card/ProductCard";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import TitleCards from "../../title-cards/TitleCards";


interface CategoryCardsProps {
    id?: string;
    title?: string;
    limit: number
}

const CategoryCards = ({ id, title, limit }: CategoryCardsProps) => {
    const { id: paramsId } = useParams();
    const [categoryCards, setCategoryCards] = useState<IProductCard[]>([]);
    const [page, setPage] = useState(1);
    const [prevParamsId, setPrevParamsId] = useState<string | undefined>(paramsId);

    const fetchCategoryCards = async () => {
        try {
            const categoryId = id || paramsId;
            if (categoryId) {
                const response = await GoodsService.getCategoryGoods(categoryId, page, limit);
                console.log('response.data', response.data)
                if (prevParamsId !== paramsId) {

                    setCategoryCards(response.data.productCards); // Заменяем categoryCards новыми данными
                } else {
                    // setCategoryCards(prevCards => [...prevCards, ...response.data.productCards]); // Добавляем новые карточки
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

    // useEffect(() => {
    //     console.log('categoryCards', categoryCards)
    // }, [categoryCards])

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
