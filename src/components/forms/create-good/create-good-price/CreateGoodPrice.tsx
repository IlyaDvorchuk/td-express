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
    const { register, formState: { errors } } = useFormContext();

    useEffect(() => {
        if (card) {
            setPriceValue(card.pricesAndQuantity.price.toString())
            if (card.pricesAndQuantity.priceBeforeDiscount) {
                setPriceDiscountValue(card.pricesAndQuantity.priceBeforeDiscount.toString())
            }
        }
    }, [card]);

    const validationInput = (e: ChangeEvent<HTMLInputElement>, input: string) => {
        const validInput = ValidateNumberInput.getValidInput(e.target.value)
        const inputValue = ValidateNumberInput.removePoints(validInput)
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
                    <label className={`label ${errors.name ? 'error' : ''}`} htmlFor="price">
                        Цена*
                    </label>
                    <input
                        id="price"
                        className={`modalInput description__input good-price__input  ${errors.name ? 'error' : ''}`}
                        defaultValue={card ? card.pricesAndQuantity.price : ''}
                        {...register('price', { required: 'Введите название товара' })}
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
