import TitleCards from "../../title-cards/TitleCards";
import React, {useMemo, useState} from "react";
import {GoodsService} from "../../../services/GoodsService";
import {IProductCardRes} from "../../../models/IProductCard";
import ProductCard from "../../cards/product-card/ProductCard";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import {useAppSelector} from "../../../hooks/redux";

const NewCards = ({limit}: {limit: number}) => {
    const [newCards, setNewCards] = useState<IProductCardRes[]>([]);
    const [page, setPage] = useState(1);
    const {user} = useAppSelector(state => state.userReducer)

    const fetchNewCards = async (pageReq: number) => {
        try {
            const response = await GoodsService.getNewGoods(pageReq, limit, user?._id);
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
