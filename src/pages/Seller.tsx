import React from 'react';
import Container from "../components/container/Container";
import BoxSeller from "../components/boxes/box-seller/BoxSeller";
import BoxCategory from "../components/boxes/box-category/BoxCategory";
import SellerCards from "../components/cards-modules/seller-cards/SellerCards";

const Seller = () => {
    return (
        <Container>
            <BoxSeller/>
            <BoxCategory>
                <SellerCards/>
            </BoxCategory>
        </Container>
    );
};

export default Seller;