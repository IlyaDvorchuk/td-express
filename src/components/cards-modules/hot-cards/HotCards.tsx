import React, {useMemo, useState} from 'react';
import TitleCards from "../../title-cards/TitleCards";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import {IProductCardRes} from "../../../models/IProductCard";
import {GoodsService} from "../../../services/GoodsService";
import ProductCard from "../../cards/product-card/ProductCard";
import {useAppSelector} from "../../../hooks/redux";

const HotCards = ({limit}: {limit: number}) => {
    const [hotCards, setHotCards] = useState<IProductCardRes[]>([]);
    const [page, setPage] = useState(1);
    const {user} = useAppSelector(state => state.userReducer)
    const fetchHotCards = async (pageReq: number) => {
        try {
            const response = await GoodsService.getHotGoods(pageReq, limit, user?._id);
            setHotCards(prevCards => [...prevCards, ...response.data.productCards]);
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    };

    const handleButtonClick = () => {
        setPage(prevPage => {
            return prevPage + 1;
        });
        fetchHotCards(page + 1)
    };

    useMemo(() => {
        fetchHotCards(1);
    }, []);

    return (
        <div>
            <TitleCards text={'Горячие предложения'}/>
            <WrapperCard handleButtonClick={handleButtonClick} cardsLength={hotCards.length} limit={limit}>
                {hotCards?.length > 0 && hotCards.map((card, index) => (
                    <ProductCard card={card} key={index}/>
                )) }
            </WrapperCard>
        </div>
    );
};

export default HotCards;
