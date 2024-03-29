import React, {ChangeEvent, useEffect} from 'react';
import './create-good-sizes.scss'
import {IType} from "../../../../models/IProductCard";
import {SEASONS} from "../../../../constants";
import Checkbox from "../../../checkbox/Checkbox";

interface IProps {
    options: string[];
    selectedOptions: string[]
    setSelectedOptions: (selectedOptions: string[]) => void;
    cardQuantity: IType[] | null,
    seasons: string[],
    setSeasons: (selectedOptions: string[]) => void;
    sizesError: boolean
}

const CreateGoodSizes = ({ options, selectedOptions, setSelectedOptions, cardQuantity, seasons, setSeasons, sizesError }: IProps) => {

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        }
    };

    const changeSeasons = (season: string) => {
        if (!seasons.includes(season)) {
            const newSeasons = [...seasons, season]
            setSeasons(newSeasons)
        } else {
            const newSeasons = seasons.filter(item => item !== season)
            setSeasons(newSeasons)
        }
    };

    useEffect(() => {
        if (cardQuantity && cardQuantity[0]?.size) {
            // @ts-ignore
            setSelectedOptions(cardQuantity.filter(type => type?.size).map(type => type.size))
        }
    }, [cardQuantity])

    return (
        <div>
            <h3 className={'subtitle'}>
                Сезон
            </h3>
            <div className={'seasons-inputs'}>
                {SEASONS.map((season, index) => (
                    <div className={'seasons-input'} key={index}>
                        <Checkbox
                            sizes={20}
                            isChecked={seasons.includes(season)}
                            onChange={() => changeSeasons(season)}
                        />
                        <p>{season}</p>
                    </div>
                ))}
            </div>
            <h3 className={`subtitle ${sizesError ? 'error' : ''}`}>
                Размер*
            </h3>
            <div className={'checkboxes-size'}>
                {options.map((option, index) => (
                    <span className={'checkbox-wrapper'} key={index}>
                        <input
                            type="checkbox"
                            className={'create-good__checkbox'}
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleCheckboxChange}
                            id={option}
                        />
                        <label key={option} htmlFor={option} className={'checkbox-wrapper__label'}>
                            {option}
                        </label>
                    </span>

                ))}
            </div>
        </div>
    );
};

export default CreateGoodSizes;
