import React, {useEffect, useState} from 'react';
import SearchCards from "../components/cards-modules/search-cards/SearchCards";
import Container from "../components/container/Container";
import MobileNavbar from "../components/mobile-navbar/MobileNavbar";
import BoxCategory from "../components/boxes/box-category/BoxCategory";
import Search from "../components/search/Search";

const SearchPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                    <SearchCards/>
                </BoxCategory>
            </Container>
        </div>
    );
};

export default SearchPage;
