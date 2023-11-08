import React, {useEffect} from 'react';
import useFetchOrder from "../hooks/fetch-order";
import Container from "../components/container/Container";
import BoxOrder from "../components/boxes/box-order/BoxOrder";

const OrderUser = () => {
    const order = useFetchOrder()

    useEffect(() => {
        window.scrollTo(0, 0); // Сбросить скролл на верхнюю часть страницы
    }, []);


    return (
        <div>
          <Container>
              {order && <BoxOrder order={order}/>}
          </Container>
        </div>
    );
};

export default OrderUser;