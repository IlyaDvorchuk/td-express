import { useState, useEffect } from 'react';
import {ShelterService} from "../services/ShelterService";
import {IColor} from "../models/IColor";

function useSortedColors() {
    const [colors, setColors] = useState<IColor[]>([]);

    useEffect(() => {
        const fetchColors = async () => {
            const fetchedColors = await ShelterService.getColors();
            if (fetchedColors.data) {
                const sortedColors = fetchedColors.data.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setColors(sortedColors);
            }
        };

        fetchColors();
    }, []);

    return colors;
}

export default useSortedColors;
