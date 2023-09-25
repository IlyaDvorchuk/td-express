import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import './create-good-quantity.scss'
import {IType} from "../../../../models/IProductCard";
import {IColor, ISelectedColor} from "../../../../models/IColor";

interface Props {
    sizes: string[],
    selectedColors: ISelectedColor[],
    inputValues: IType[],
    setInputValues: Dispatch<SetStateAction<IType[]>>;
    cardQuantity: IType[] | null
}

const CreateGoodQuantity = ({sizes, inputValues,  setInputValues, cardQuantity, selectedColors}: Props) => {

    useEffect(() => {
        if (cardQuantity) {
            setInputValues(cardQuantity)
        }
    }, [])

    const types = useMemo(() => {
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
        const newInputValues = inputValues.map((currentInputValue, index) => {
            const type = combinedTypes[index]; // Соответствующий элемент в types
            console.log('inputValues', inputValues)
            // В этой логике вы можете обновить quantity или другие свойства inputValues
            return {
                size: type.size,
                quantity: currentInputValue.quantity,
                color: type.color,
            };
        });
        setInputValues(newInputValues);
        return combinedTypes;
    }, [ sizes, selectedColors]);

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
        console.log('selectedColors', selectedColors)
    }, [selectedColors])

    return (
        <div>
            <h3 className="subtitle">
                Наличие товара на складе
            </h3>
            <div className={'quantities'}>
                {types.map((item, index) => (
                    <div key={index} className={'quantity'}>
                        <div className={'quantities__size'}>
                            Размер: <b>{item.size}</b>
                            {item?.color && (
                                <>
                                    , Цвет: <b>{item.color.name}</b>
                                </>
                            )}
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
