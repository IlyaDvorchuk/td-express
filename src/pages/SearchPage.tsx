import React, {useEffect, useState} from 'react';
import SearchCards from "../components/cards-modules/search-cards/SearchCards";
import Container from "../components/container/Container";
import MobileNavbar from "../components/mobile-navbar/MobileNavbar";
import BoxCategory from "../components/boxes/box-category/BoxCategory";
import Search from "../components/search/Search";
import {useAppSelector} from "../hooks/redux";
import BoxNotFoundSearch from "../components/boxes/box-not-found-search/BoxNotFoundSearch";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import NewCards from "../components/cards-modules/new-cards/NewCards";

const SearchPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {cards} = useAppSelector(state => state.searchReducer)

    useEffect(() => {
        // Обработчик изменения размера окна
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Добавление обработчика события изменения размера окна
        window.addEventListener('resize', handleResize);

        // Удаление обработчика при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <MobileNavbar/>
            <Container>
                {windowWidth < 690 && <Search mobile={true} />}
                <BoxCategory>
                    {cards.length > 0 ? <SearchCards cards={cards}/>
                    : <BoxNotFoundSearch/> }
                </BoxCategory>
                {
                   cards.length === 0 && <>
                        <HotCards limit={6}/>
                        <NewCards limit={6}/>
                    </>
                }
            </Container>
        </div>
    );
};

export default SearchPage;
