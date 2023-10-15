import React, {ChangeEvent, useMemo, useState} from 'react';
import './color-checkboxes.scss'
import Checkbox from "../../checkbox/Checkbox";
import useSortedColors from "../../../hooks/useSortedColors";
import {IColor, ISelectedColor} from "../../../models/IColor";

interface IProps {
    selectedColors: ISelectedColor[],
    setSelectedColors: (selectedColors: ISelectedColor[]) => void;
    isPagination?: boolean
}

const ColorCheckboxes = ({selectedColors, setSelectedColors, isPagination = false}: IProps) => {
    const colors = useSortedColors();
    const [displayedColors, setDisplayedColors] = useState(10);

    const displayedColorsItem = useMemo(() => {
        return isPagination ? colors.slice(0, displayedColors) :
            colors
    }, [isPagination, displayedColors, colors])

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, colorItem: IColor) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors([...selectedColors, colorItem]);
        } else {
            setSelectedColors(selectedColors.filter((option) => option.color !== colorItem.color));
        }
    };

    const addColors = (e: any) => {
        e.preventDefault()
        setDisplayedColors(displayedColors + 10)
    }

    return (
        <div>
            {displayedColorsItem.map(colorItem => (
                <div key={colorItem._id} className={`color-item ${!isPagination ? 'color-item_left' : ''}`}>
                    <Checkbox
                        sizes={20}
                        isChecked={!!selectedColors.find(color => color.color === colorItem.color)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, colorItem)}/>
                    <div className={`color-item__color ${colorItem.color === '#FFFFFF' ? 'white' : ''}`}
                         style={{background: colorItem.color}}/>
                    <div>
                        {colorItem.name}
                    </div>
                </div>
            ))}
            {isPagination && (displayedColorsItem.length < colors.length) && <button className={'color-add'} onClick={addColors}>
                <span>
                    Ещё 10
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M8.6 4L5.88333 6.71667C5.5625 7.0375 5.0375 7.0375 4.71667 6.71667L2 4" stroke="#6F6E71" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>}
        </div>
    );
};

export default ColorCheckboxes;