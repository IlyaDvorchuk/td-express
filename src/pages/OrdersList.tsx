import React from 'react';
import BoxOrderList from "../components/boxes/box-order-list/BoxOrderList";
import Container from "../components/container/Container";

const OrdersList = () => {
    return (
        <div style={{minHeight: '75vh'}}>
            <Container>
                <BoxOrderList/>
            </Container>
        </div>
    );
};

export default OrdersList;
