import React from 'react';
import Container from "../components/container/Container";
import BoxCart from "../components/boxes/box-cart/BoxCart";
import HotCards from "../components/cards-modules/hot-cards/HotCards";
import NewCards from "../components/cards-modules/new-cards/NewCards";

const Cart = () => {
    // const navigation = useNavigate()
    //
    // useEffect(() => {
    //     if (!getAccessTokenUser()) navigation('/')
    // }, [navigation])

    return (
        <div>
            <Container>
                <BoxCart/>
                <HotCards limit={6}/>
                <NewCards limit={6}/>
            </Container>
        </div>
    );
};

export default Cart;
