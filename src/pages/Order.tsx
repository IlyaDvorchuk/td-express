import React, {useEffect} from 'react';
import Container from "../components/container/Container";
import FormOrder from "../components/forms/create-order/FormOrder";

const Order = () => {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    return (
        <div>
            <Container>
                <FormOrder/>
            </Container>
        </div>
    );
};

export default Order;