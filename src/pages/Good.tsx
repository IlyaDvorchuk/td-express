import React from 'react';
import Container from "../components/container/Container";
import BoxGood from "../components/boxes/box-good/BoxGood";
import BoxGoodInformation from "../components/boxes/box-good-information/BoxGoodInformation";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import NewCards from "../components/cards-modules/new-cards/NewCards";
import MobileNavbar from "../components/mobile-navbar/MobileNavbar";
import useFetchCard from "../hooks/fetch-card";

const Good = () => {
    const card = useFetchCard();

    return (
        <div>
            <MobileNavbar/>
            <Container isWideMobile={true}>
                {card ?
                    <>
                        <BoxGood card={card}/>
                        <BoxGoodInformation card={card}/>
                    </>
                    :
                    <div>Loading...</div>
                }
                <HotCards limit={6}/>
                <NewCards limit={6}/>
            </Container>
        </div>
    );
};

export default Good;
