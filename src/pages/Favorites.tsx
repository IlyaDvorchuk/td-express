import React, {useEffect} from 'react';
import Container from "../components/container/Container";
import BoxFavorites from "../components/boxes/box-favorites/BoxFavorites";
import {useNavigate} from "react-router-dom";
import {getAccessTokenUser} from "../utils/tokens";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import NewCards from "../components/cards-modules/new-cards/NewCards";

const Favorites = () => {
    const navigation = useNavigate()

    useEffect(() => {
        if (!getAccessTokenUser()) navigation('/')
    }, [ navigation])

    return (
        <div>

            <Container>
                <BoxFavorites/>
                <HotCards limit={6}/>
                <NewCards limit={6}/>
            </Container>
        </div>
    );
};

export default Favorites;
