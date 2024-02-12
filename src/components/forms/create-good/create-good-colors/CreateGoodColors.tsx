import React, {ChangeEvent, useEffect, useState} from 'react';
import './create-good-colors.scss'
import {IColor, ISelectedColor, IWatchColor} from "../../../../models/IColor";
import Checkbox from "../../../checkbox/Checkbox";
import {IType} from "../../../../models/IProductCard";
import useSortedColors from "../../../../hooks/useSortedColors";

interface IPropsCreateGoodColors {
    selectedColors: ISelectedColor[]
    setSelectedColors: (selectedColors: ISelectedColor[]) => void;
    typesCard: IType[] | undefined,
    isWatch: boolean,
    watchColors:  IWatchColor[],
    setWatchColors:  React.Dispatch<React.SetStateAction<IWatchColor[]>>

}

const CreateGoodColors = ({selectedColors, setSelectedColors, typesCard, isWatch, watchColors, setWatchColors}: IPropsCreateGoodColors) => {
    const [isOpenColors, setIsOpenColors] = useState(false)
    const colors = useSortedColors();
    const [watchOpenColor, setWatchOpenColor] = useState<{
        type: 'strapColor' | 'dialColor',
        index: number
    } | null>(null)

    useEffect(() => {
        if (!isOpenColors) {
            setWatchOpenColor(null)
        }
    }, [isOpenColors])

    useEffect(() => {
        if (typesCard) {
            const filteredColors = colors.filter((color) =>
                typesCard.some((type) => type.color?.name === color.name)
            );

            setSelectedColors(filteredColors);
        }
    }, [typesCard, colors, setSelectedColors])

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, colorItem: IColor) => {
        const isChecked = event.target.checked;

        if (watchOpenColor) {
            const newWatchColors = [...watchColors]; // Создаем копию массива watchColors
            newWatchColors[watchOpenColor.index] = {
                ...newWatchColors[watchOpenColor.index],
                [watchOpenColor.type]: isChecked ? colorItem : null
            };
            setWatchColors(newWatchColors);
            return;
        }
        if (isChecked) {
            setSelectedColors([...selectedColors, colorItem]);
        } else {
            setSelectedColors(selectedColors.filter((option) => option.color !== colorItem.color));
        }
    };

    const saveButtonModal = (e: any, watchColor?:  'strapColor' | 'dialColor', indexWatchColor?: number | null) => {
        e.preventDefault()
        if (watchColor && isWatch && indexWatchColor !== null && indexWatchColor !== undefined  ) {
            setWatchOpenColor({
                type: watchColor,
                index: indexWatchColor
            })
        }
        setIsOpenColors(!isOpenColors)
    }

    const onAddWatchColors = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setWatchColors(prevState => [...prevState, {
            strapColor: null,
            dialColor: null
        }])
    }

    const onDeleteColorWatch = (index: number) => {
        setWatchColors(prevState => {
            // Фильтруем массив, оставляя только элементы, чей индекс не совпадает с переданным индексом
            return prevState.filter((_, i) => i !== index);
        });
    };

    return (
        <div className={'good-colors'}>
            <h3 className={'subtitle subtitle_add'}>
                Цвет
            </h3>
            <p className="add-description dimensions__add">
                Выберите все цвета товара в таблице
            </p>
            {isWatch && <div>
                <div>
                    {watchColors.map((colors, index) => (
                        <div>
                            <div className={'good-colors__header'}>
                                <h3 className={'good-colors__subtitle'}>
                                    Расцветка {index + 1}
                                </h3>
                                <svg className={'good-colors__cancel'} onClick={() => onDeleteColorWatch(index)} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.2074 12.3361C0.907429 12.6218 0.907429 13.0849 1.2074 13.3705C1.50737 13.6562 1.99372 13.6562 2.2937 13.3705L7.75055 8.17443L13.2074 13.3705C13.5074 13.6562 13.9937 13.6562 14.2937 13.3705C14.5937 13.0849 14.5937 12.6218 14.2937 12.3361L8.83684 7.14004L14.2937 1.94393C14.5937 1.65829 14.5937 1.19518 14.2937 0.909541C13.9937 0.623903 13.5074 0.623903 13.2074 0.909541L7.75055 6.10565L2.2937 0.909542C1.99372 0.623903 1.50737 0.623903 1.2074 0.909542C0.907429 1.19518 0.907429 1.65829 1.2074 1.94393L6.66425 7.14004L1.2074 12.3361Z" fill="#3A373D"/>
                                </svg>

                            </div>
                            <p className={'good-colors__watch-color'}>
                                <div>
                                    <label className={'label'}>
                                        Цвет ремешка
                                    </label>
                                    <div key={`strapColor-${index}`} className={'select-color'} onClick={(e) => saveButtonModal(e, 'strapColor', index)}>
                                        {!colors.strapColor ? <p className={'select-color__add'}>ВЫБРАТЬ ЦВЕТ</p>
                                            : <>
                                                <div className={'color-example'} style={{backgroundColor: colors.strapColor.color}}/>
                                                <div className={'color-text'}>
                                                    {colors.strapColor.name}
                                                </div>
                                            </>
                                        }
                                    </div>

                                </div>
                                <div>
                                    <label className={'label'}>
                                        Цвет циферблата
                                    </label>
                                    <div key={`dialColor-${index}`} className={'select-color'} onClick={(e) => saveButtonModal(e, 'dialColor', index)}>
                                        {!colors.dialColor ? <p className={'select-color__add'}>ВЫБРАТЬ ЦВЕТ</p>
                                            : <>
                                                <div className={'color-example'} style={{backgroundColor: colors.dialColor.color}}/>
                                                <div className={'color-text'}>
                                                    {colors.dialColor.name}
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </p>
                        </div>
                    ))}
                </div>
                <button className={'button button_light'} onClick={onAddWatchColors}>Добавить расцветку</button>
            </div>}
            <div className={'good-colors__select'}>
                {!isWatch && <button className={'button button_light good-colors__button'} onClick={(e) => saveButtonModal(e)}>
                    Открыть таблицу цветов
                </button>}
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
                                    isChecked={
                                    !watchOpenColor ?
                                    !!selectedColors.find(color => color.color === colorItem.color)
                                        : watchColors[watchOpenColor.index]?.[watchOpenColor.type]?.color === colorItem.color
                                }
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, colorItem)}/>
                                <div className={`modal-colors__color ${colorItem.color === '#FFFFFF' ? 'white' : ''}`}
                                     style={{background: colorItem.color}}/>
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
