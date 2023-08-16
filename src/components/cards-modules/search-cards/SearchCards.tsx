import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/redux";
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import ProductCard from "../../cards/product-card/ProductCard";

const SearchCards = () => {
    const {cards} = useAppSelector(state => state.searchReducer)

    // useEffect(() => {
    //     console.log('cards', cards)
    // }, [cards])


    return (
        <div>
            <WrapperCard limit={32}>
                {cards.map((card) => (
                    <ProductCard card={card} key={card._id}/>
                ))}
            </WrapperCard>
        </div>
    );
};

export default SearchCards;
