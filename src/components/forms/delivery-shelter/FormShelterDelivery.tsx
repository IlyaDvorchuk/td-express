import React, {useEffect} from 'react';
import './form-shelter-delivery.scss'
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {ShelterService} from "../../../services/ShelterService";
import {useAppSelector} from "../../../hooks/redux";

const schema = yup.object().shape({
    deliveryPoints: yup.array().of(
        yup.object().shape({
            city: yup.string().required('Обязательное поле'),
            price: yup.string().required('Обязательное поле'),
        })
    ),
});

const availableCities = [
    'Тирасполь', 'Бендеры', 'Рыбница', 'Дубоссары', 'Слободзея', 'Григориополь', 'Каменка'
];

const FormShelterDelivery = () => {
    const {isHoverTools, shelter} = useAppSelector(state => state.shelterReducer)
    const {
        register,
        handleSubmit,
        control,
    } = useForm({
        resolver: yupResolver(schema),

    });


    const { fields, append, remove } = useFieldArray({
        control,
        name: 'deliveryPoints',
    });


    useEffect(() => {

        const fetchDelivery = async () => {
            try {
                if (shelter?._id) {
                    const response = await ShelterService.getDelivery(shelter._id)

                    if (response.data) {
                        remove(0)
                        response.data.forEach((field => append({
                            city: field.city,
                            price: field.price,
                        })))
                    }
                }
            } catch (e) {
                console.log('e', e)
            }
        }

        fetchDelivery()
    }, [append, remove, shelter._id])

    useEffect(() => {
        // Добавляем один элемент по умолчанию при первом рендеринге
        if (fields.length === 0) {
            append({ city: '', price: '' });
        }
    }, [append, fields.length]);

    const addDeliveryPoint = () => {
        append({ city: '', price: '' });
    }

    const removeDeliveryPoint = (index: number) => {
        remove(index); // Удаление элемента из массива по индексу
    }

    const onClickEmpty = async () => {
        // @ts-ignore
        if (fields.length === 1 && !fields[0].city && !fields[0].price) {
            await ShelterService.updateDelivery({deliveryPoints: []})
        }
    }

    const onSubmit = async (data: any) => {
        // @ts-ignore
        const uniqueCities = [...new Set(data.deliveryPoints.map((point: any) => point.city))];

        if (uniqueCities.length !== data.deliveryPoints.length) {
            // Вывести ошибку или выполнить другие действия по вашему усмотрению
            console.error('Городы должны быть уникальными.');
        } else {
            // Если города уникальны, выполните сохранение данных
            await ShelterService.updateDelivery(data);
        }
    };

    return (
        <form className={'delivery-shelter'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'delivery-shelter__title'}>Доставка товаров</h3>
            {fields.map((field, index) => (
                <div key={index} className={`delivery-cities ${index > 0 ? 'border' : ''}`}>
                    <div className={'delivery-shelter__input delivery-shelter__input_1'}>
                        <label htmlFor={`deliveryPoints.${index}.city`} className={'label'}>Населённый пункт</label>
                        <input
                            {...register(`deliveryPoints.${index}.city`)}
                            placeholder="Город"
                            id={`deliveryPoints.${index}.city`}
                            className={'modalInput modalInput_dark-border'}
                            list={`cityOptions-${index}`} // Указываем ID datalist
                        />
                        <datalist id={`cityOptions-${index}`}>
                            {availableCities.map((city, cityIndex) => (
                                <option key={cityIndex} value={city} />
                            ))}
                        </datalist>
                    </div>

                    <div className={'delivery-shelter__input'}>
                        <label htmlFor={`deliveryPoints.${index}.price`} className={'label'}>Стоимость доставки (в рублях ПМР)</label>
                        <input
                            {...register(`deliveryPoints.${index}.price`)}
                            placeholder="Стоимость"
                            className={'modalInput modalInput_dark-border'}
                            id={`deliveryPoints.${index}.price`}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => removeDeliveryPoint(index)}
                        className={'delivery-shelter__remove'}
                        style={{zIndex: isHoverTools ? 1 : 1111}}
                    >
                        <img src={'/images/svg/delivery/remove-button.svg'} alt={'Удалить'}/>
                    </button>
                </div>
            ))}
            <button onClick={addDeliveryPoint} className={'button button_light delivery-shelter__add'}>
                ДОБАВИТЬ ЕЩЕ НАСЕЛЕННЫЙ ПУНКТ
            </button>
            <button type={'submit'} onClick={onClickEmpty} className={'button button_dark delivery-shelter__save'}>
                Сохранить
            </button>
        </form>
    );
};

export default FormShelterDelivery;
