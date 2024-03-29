import React from 'react';
import Container from "../components/container/Container";
import Slider from "../components/slider/Slider";
import {useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";
import NewCards from "../components/cards-modules/new-cards/NewCards";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import CategoryCards from "../components/cards-modules/category-cards/CategoryCards";
import MobileNavbar from "../components/navbars/mobile-navbar/MobileNavbar";

const MainPage = () => {
    const accessToken = useAppSelector((state) => state.shelterReducer.accessToken);
    const {categories} = useAppSelector(state => state.categoriesReducer)



    if (accessToken) {
        return <Navigate to="/seller/main" />;
    }

    return (
        <div>
            <MobileNavbar/>

            <Container>
                {/*{windowWidth < 690 && <Search mobile={true} />}*/}
                <Slider/>
                <HotCards limit={12}/>
                <NewCards limit={12}/>
                {/*<SpeciallyCards/>*/}
                {categories.filter(category => category.productCards.length > 0).map(category => (

                    <>
                        {category.productCards.length > 0 &&
                            <CategoryCards id={category._id} key={category._id} title={category.name} limit={12}/>
                        }
                    </>
                ))}
            </Container>
        </div>
    );
};

export default MainPage;
