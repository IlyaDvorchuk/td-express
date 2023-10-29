import React, {ChangeEvent, useState} from 'react';
import './create-good-dimensions.scss'
import { useFormContext } from 'react-hook-form';
import {ValidateNumberInput} from "../../../../utils/validateNumberInput";

const CreateGoodDimensions = () => {
    const { register } = useFormContext();
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')

    const validationInput = (e: ChangeEvent<HTMLInputElement>, input: string) => {
        const validInput = ValidateNumberInput.getValidInput(e.target.value)
        const inputValue = ValidateNumberInput.removePoints(validInput)
        if (input === 'length') {
            setLength(inputValue)
        } else if (input === 'width') {
            setWidth(inputValue)
        } else if (input === 'height') {
            setHeight(inputValue)
        } else if (input === 'weight') {
            setWeight(inputValue)
        }
    }

    return (
        <div className={'dimensions'}>
            <h3 className="subtitle subtitle_add">Габариты (информация для доставки)</h3>
            <p className="add-description dimensions__add">Укажите размеры товара в упаковке</p>
            <div className="good-dimensions">
                <div className="description__block">
                    <label className="label" htmlFor="length">
                        Длина, см
                    </label>
                    <input
                        id="length"
                        className="modalInput description__input good-dimensions__input"
                        {...register('length')}
                        value={length}
                        onChange={(e) => validationInput(e, 'length')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="width">
                        Ширина, см
                    </label>
                    <input
                        id="width"
                        className="modalInput description__input good-dimensions__input"
                        {...register('width')}
                        value={width}
                        onChange={(e) => validationInput(e, 'width')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="height">
                        Высота, см
                    </label>
                    <input
                        id="height"
                        className="modalInput description__input good-dimensions__input"
                        {...register('height')}
                        value={height}
                        onChange={(e) => validationInput(e, 'height')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="weight">
                        Вес, кг
                    </label>
                    <input
                        id="weight"
                        className="modalInput description__input good-dimensions__input"
                        {...register('weight')}
                        value={weight}
                        onChange={(e) => validationInput(e, 'weight')}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateGoodDimensions;
