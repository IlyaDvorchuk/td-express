import React, {ChangeEvent, useEffect} from 'react';
import './create-good-sizes.scss'
import {IType} from "../../../../models/IProductCard";

interface IProps {
    options: string[];
    selectedOptions: string[]
    setSelectedOptions: (selectedOptions: string[]) => void;
    cardQuantity: IType[] | null

}

const CreateGoodSizes = ({ options, selectedOptions, setSelectedOptions, cardQuantity }: IProps) => {

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        }
    };

    useEffect(() => {
        if (cardQuantity) {
            setSelectedOptions(cardQuantity.map(type => type.size))
        }
    }, [cardQuantity])

    return (
        <div>
            <h3 className={'subtitle'}>
                Размер
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
            {/*<h3 className={'subtitle'}>*/}
            {/*    Таблица размеров*/}
            {/*</h3>*/}
            {/*<button className={'button button_light'}>*/}
            {/*    Таблица размеров*/}
            {/*</button>*/}
        </div>
    );
};

export default CreateGoodSizes;
