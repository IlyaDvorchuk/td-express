import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "./redux";
import {IOrderSlice} from "../store/reducers/OrderSlice";


const useSetOrder = () => {
    const navigate = useNavigate();
    const orderStore = useAppSelector(state => state.orderReducer);
    const [order, setOrder] = useState<IOrderSlice>(orderStore);

    useEffect(() => {
        if (orderStore.cards.length === 0) {
            const sessionOrder = sessionStorage.getItem('form-order');
            if (sessionOrder) {
                setOrder(JSON.parse(sessionOrder));
            } else {
                navigate('');
            }
        }
    }, [navigate, orderStore]);

    return order;
};

export default useSetOrder;