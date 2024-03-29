import React, {useEffect} from 'react';
import Container from "../components/container/Container";
import BoxGood from "../components/boxes/box-good/BoxGood";
import BoxGoodInformation from "../components/boxes/box-good-information/BoxGoodInformation";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import NewCards from "../components/cards-modules/new-cards/NewCards";
import MobileNavbar from "../components/navbars/mobile-navbar/MobileNavbar";
import useFetchCard from "../hooks/fetch-card";
import {GoodsService} from "../services/GoodsService";

const Good = () => {
    const card = useFetchCard();

    useEffect(() => {
        window.scrollTo(0, 0); // Сбросить скролл на верхнюю часть страницы
    }, []);

    useEffect(() => {
        console.log('card', card)
        const updateCount = async () => {
            if (card) {
                try {
                    await GoodsService.updateCountGood(card._id)
                } catch (e) {
                    console.error(e)
                }
            }
        }

        updateCount()
    }, [card])

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
