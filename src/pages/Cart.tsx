import React from 'react';
import Container from "../components/container/Container";
import BoxCart from "../components/boxes/box-cart/BoxCart";

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
            </Container>
        </div>
    );
};

export default Cart;
