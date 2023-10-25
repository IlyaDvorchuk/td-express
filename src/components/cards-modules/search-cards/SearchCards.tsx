import React from 'react';
import WrapperCard from "../../wrappers/wrapper-card/WrapperCard";
import ProductCard from "../../cards/product-card/ProductCard";
import {IProductCard} from "../../../models/IProductCard";

const SearchCards = ({cards}: {cards: IProductCard[]}) => {


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
