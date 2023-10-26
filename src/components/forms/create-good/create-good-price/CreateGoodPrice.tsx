import {ChangeEvent, useEffect, useState} from 'react';
import './create-good-price.scss'
import { useFormContext } from 'react-hook-form';
import {IProductCard} from "../../../../models/IProductCard";
import {ValidateNumberInput} from "../../../../utils/validateNumberInput";

interface IProps {
    isClothes: boolean | null
    card: IProductCard | null
}

const CreateGoodPrice = ({isClothes, card}: IProps) => {
    const [priceValue, setPriceValue] = useState('')
    const [priceDiscountValue, setPriceDiscountValue] = useState('')
    const [quantityInStockValue, setQuantityInStockValue] = useState('')
    const { register } = useFormContext();

    // const price = watch('price');
    // const priceDiscount = watch('priceDiscount');
    // const quantityInStock = watch('quantityInStock');

    useEffect(() => {
        if (card) {
            setPriceValue(card?.pricesAndQuantity?.price.toString() ? card?.pricesAndQuantity?.price.toString() : '')
            setPriceDiscountValue(card?.pricesAndQuantity?.priceBeforeDiscount.toString() ? card?.pricesAndQuantity?.priceBeforeDiscount.toString() : '')
        }
    }, [card])


    const validationInput = (e: ChangeEvent<HTMLInputElement>, input: string) => {
        const validInput = ValidateNumberInput.getValidInput(e.target.value)
        const inputValue = ValidateNumberInput.removePoints(validInput)
        console.log('input', input)
        if (input === 'price') {
            setPriceValue(inputValue)
        } else if (input === 'priceDiscount') {
            setPriceDiscountValue(inputValue)
        } else if (input === 'quantityInStock') {
            setQuantityInStockValue(inputValue)
        }
    }

    return (
        <>
            <h3 className="subtitle">Цена и наличие товара</h3>
            <div className="good-price">
                <div className="description__block">
                    <label className="label" htmlFor="price">
                        Цена
                    </label>
                    <input
                        id="price"
                        className="modalInput description__input good-price__input"
                        {...register('price')}
                        value={priceValue}
                        onChange={(e) => validationInput(e, 'price')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="priceDiscount">
                        Цена до скидки
                    </label>
                    <input
                        id="priceDiscount"
                        className="modalInput description__input good-price__input"
                        defaultValue={card ? card.pricesAndQuantity.priceBeforeDiscount : ''}
                        {...register('priceDiscount')}
                        value={priceDiscountValue}
                        onChange={(e) => validationInput(e, 'priceDiscount')}
                    />
                </div>
                {!isClothes && <div className="description__block">
                    <label className="label" htmlFor="quantityInStock">
                        Количество на складе (единиц в наличии)
                    </label>
                    <input
                        id="quantityInStock"
                        className="modalInput description__input good-price__input"
                        defaultValue={card ? card.pricesAndQuantity.quantity : ''}
                        {...register('quantityInStock')}
                        value={quantityInStockValue}
                        onChange={(e) => validationInput(e, 'quantityInStock')}
                    />
                </div>}
            </div>
        </>
    );
};

export default CreateGoodPrice;
