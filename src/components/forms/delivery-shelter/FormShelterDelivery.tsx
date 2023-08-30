import React, {useEffect} from 'react';
import './form-shelter-delivery.scss'
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    deliveryPoints: yup.array().of(
        yup.object().shape({
            city: yup.string().required('Обязательное поле'),
            price: yup.string().required('Обязательное поле'),
        })
    ),
});


const FormShelterDelivery = () => {
    const {
        register,
        handleSubmit,
        control,
    } = useForm({
        resolver: yupResolver(schema),

    });


    const { fields, append, remove } = useFieldArray({
        control,
        name: 'deliveryCities',
    });

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

    const onSubmit = (data: any) => {
        console.log('hey, deliveryPoints', data)
    };

    return (
        <form className={'delivery-shelter'} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={'delivery-shelter__title'}>Доставка товаров</h3>
            {fields.map((field, index) => (
                <div key={index} className="delivery-point">
                    <div>
                        <label htmlFor={`deliveryPoints.${index}.city`} className={'label'}>Населённый пункт</label>
                        <input
                            {...register(`deliveryPoints.${index}.city`)}
                            placeholder="Город"
                            id={`deliveryPoints.${index}.city`}
                            className={'modalInput modalInput_light'}
                        />
                    </div>

                    <div>
                        <label htmlFor={`deliveryPoints.${index}.price`} className={'label'}>Стоимость доставки (в рублях ПМР)</label>
                        <input
                            {...register(`deliveryPoints.${index}.price`)}
                            placeholder="Стоимость"
                            className={'modalInput modalInput_light'}
                            id={`deliveryPoints.${index}.price`}
                        />
                    </div>

                    <button type="button" onClick={() => removeDeliveryPoint(index)}>Удалить</button>
                </div>
            ))}
            <button onClick={addDeliveryPoint}>
                ДОБАВИТЬ ЕЩЕ НАСЕЛЕННЫЙ ПУНКТ
            </button>
            <button type={'submit'}>
                Сохранить
            </button>
        </form>
    );
};

export default FormShelterDelivery;
