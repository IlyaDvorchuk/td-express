import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import './create-good-quantity.scss'
import {IType} from "../../../../models/IProductCard";
import {IColor, ISelectedColor} from "../../../../models/IColor";

interface Props {
    sizes: string[],
    selectedColors: ISelectedColor[],
    setInputValues: Dispatch<SetStateAction<IType[]>>;
    cardQuantity: IType[] | null
    isTypeClothes: boolean | null
}

const CreateGoodQuantity = ({sizes, setInputValues, cardQuantity, selectedColors, isTypeClothes}: Props) => {

    useEffect(() => {
        if (cardQuantity) {
            setInputValues(cardQuantity)
        }
    }, [])

    const types = useMemo(() => {

        if (isTypeClothes) {
            if (!sizes) return [];

            if (!selectedColors || selectedColors.length === 0) {
                return sizes.map(size => ({ size, color: null }));
            }

            const combinedTypes: any[] = [];

            const uniqueSizes = [...new Set(sizes)];


            for (const size of uniqueSizes) {
                for (const colorObj of selectedColors) {
                    combinedTypes.push({
                        size,
                        color: {
                            color: colorObj.color,
                            name: colorObj.name,
                            _id: colorObj._id,
                            image: colorObj?.image
                        } || null, // Здесь вы можете использовать значение по умолчанию
                    });
                }
            }

            setInputValues(combinedTypes);
            return combinedTypes;
        } else {

            if (selectedColors.length === 0) {
                return [
                    {}
                ]
            }
            const combinedTypes: any[] = [];
                for (const colorObj of selectedColors) {
                    combinedTypes.push({
                        color: {
                            color: colorObj.color,
                            name: colorObj.name,
                            _id: colorObj._id,
                            image: colorObj?.image
                        } || null, // Здесь вы можете использовать значение по умолчанию
                    });
                }

            setInputValues(combinedTypes);
            return combinedTypes;
        }

    }, [ sizes, selectedColors, isTypeClothes]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: { size: string; color: IColor | null; } | IType, index: number) => {
        const newValue = event.target.value;
        setInputValues((prevInputValues) => {
            const updatedValues = [...prevInputValues];
            updatedValues[index] = { size: type.size, quantity: +newValue, color: type.color };
            return updatedValues;
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }


    useEffect(() => {

        console.log('types', types)
    }, [types])

    return (
        <div>
            <h3 className="subtitle">
                Наличие товара на складе
            </h3>
            <div className={'quantities'}>
                {types.map((item, index) => (
                    <div key={index} className={'quantity'}>
                        <div className={'quantities__size'}>
                            {item?.size && <>
                                <span>Размер:</span> <b>{item.size}</b>
                            </>}

                            {item?.color && (
                                <>
                                {item?.size &&<span>, </span>} Цвет: <b>{item.color.name}</b>
                                </>
                            )}
                            {(item?.size || item?.color) && <span>*</span>}

                        </div>
                        <div>
                            <label htmlFor={`input-${index}`} className={'label'}>
                                Количество на складе (единиц в наличии)
                            </label>
                            <input
                                pattern="[0-9]*"
                                className={'modalInput'}
                                id={`input-${index}`}
                                type="text"
                                defaultValue={cardQuantity ? cardQuantity[index]?.quantity : ''}
                                onChange={(event) => handleChange(event, item, index)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CreateGoodQuantity;
