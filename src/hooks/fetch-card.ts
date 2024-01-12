import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {IProductCardRes} from "../models/IProductCard";
import {GoodsService} from "../services/GoodsService";
import {useAppSelector} from "./redux";

const useFetchCard = (): IProductCardRes | null => {
    const location = useLocation();
    const { id } = useParams();
    const [card, setCard] = useState<IProductCardRes | null>(null);
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        const fetchCard = async () => {
            if (location.state) {
                setCard(location.state);
            } else if (id) {
                try {
                    const fetchedCard = await GoodsService.getGood(id, user?._id);
                    setCard(fetchedCard.data);
                } catch (error) {
                    console.error("Error fetching card:", error);
                }
            }
        };

        fetchCard();
    }, [id, location.state]);

    return card;
};

export default useFetchCard;
