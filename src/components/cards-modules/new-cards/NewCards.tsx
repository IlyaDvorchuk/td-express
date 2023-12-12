import TitleCards from "../../title-cards/TitleCards";
import React, {useMemo, useState} from "react";
import {GoodsService} from "../../../services/GoodsService";
import {IProductCard} from "../../../models/IProductCard";
import ProductCard from "../../cards/product-card/ProductCard";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";

const NewCards = ({limit}: {limit: number}) => {
    const [newCards, setNewCards] = useState<IProductCard[]>([]);
    const [page, setPage] = useState(1);

    const fetchNewCards = async (pageReq: number) => {
        try {
            const response = await GoodsService.getNewGoods(pageReq, limit);
            setNewCards(prevCards => [...prevCards, ...response.data.productCards]);
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    };

    const handleButtonClick = () => {
        setPage(prevPage => {
            return prevPage + 1;
        });
        fetchNewCards(page + 1)
    };

    useMemo(() => {
        fetchNewCards(1);
    }, []);


    return (
        <div>
            <TitleCards text={'Новинки'}/>
            <WrapperCard handleButtonClick={handleButtonClick} cardsLength={newCards.length} limit={limit}>
                {newCards.map((card, index) => (
                    <ProductCard card={card} key={index}/>
                )) }
            </WrapperCard>
        </div>
    );
};

export default NewCards;
