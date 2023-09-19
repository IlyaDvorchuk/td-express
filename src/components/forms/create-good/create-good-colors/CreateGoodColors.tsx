import React, {ChangeEvent, useEffect, useState} from 'react';
import './create-good-colors.scss'
import {ShelterService} from "../../../../services/ShelterService";
import {IColor} from "../../../../models/IColor";
import Checkbox from "../../../checkbox/Checkbox";
// import {IType} from "../../../../models/IProductCard";

interface IPropsCreateGoodColors {
    selectedColors: IColor[]
    setSelectedColors: (selectedColors: IColor[]) => void;
    // cardQuantity: IType[] | null

}

const CreateGoodColors = ({selectedColors, setSelectedColors}: IPropsCreateGoodColors) => {
    const [isOpenColors, setIsOpenColors] = useState(false)
    const [colors, setColors] = useState<IColor[]>([])

    useEffect(() => {
        const fetchColors = async () => {
            const fetchedColors = await ShelterService.getColors();
            if (fetchedColors.data) {
                setColors(fetchedColors.data);
            }

        };

        fetchColors();
    }, []);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, colorItem: IColor) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors([...selectedColors, colorItem]);
        } else {
            setSelectedColors(selectedColors.filter((option) => option.color !== colorItem.color));
        }
    };

    return (
        <div className={'good-colors'}>
            <h3 className={'subtitle subtitle_add'}>
                Цвет
            </h3>
            <p className="add-description dimensions__add">
                Выберите все цвета товара в таблице
            </p>
            <div className={'good-colors__select'}>
                <button className={'button button_light good-colors__button'} onClick={() => setIsOpenColors(!isOpenColors)}>
                    Открыть таблицу цветов
                </button>
                {isOpenColors && <form className={'good-colors__modal modal-colors'}>
                    <div className={'modal-colors__header'}>
                        <h4 className={'modal-colors__title'}>Выбрать цвет</h4>
                        <button className={'modal-colors__close'} onClick={() => setIsOpenColors(false)}>
                            <img src="/images/svg/create-good/close-circle-colors.svg" alt="Выключить выбор цветов"/>
                        </button>
                    </div>
                    <div>
                        {colors.map(colorItem => (
                            <div key={colorItem._id} className={'modal-colors__item'}>
                                <Checkbox
                                    sizes={20}
                                    isChecked={!!selectedColors.find(color => color.color === colorItem.color)}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, colorItem)}/>
                                <div className={'modal-colors__color'} style={{backgroundColor: colorItem.color}}/>
                                <div>
                                    {colorItem.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={'modal-colors__footer'}>
                        <button className={'button button_light modal-colors__button'} onClick={() => setIsOpenColors(false)}>Добавить цвета</button>
                    </div>
                </form>}
            </div>
        </div>
    );
};

export default CreateGoodColors;
