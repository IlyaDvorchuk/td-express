import React, {useEffect} from 'react';
import * as yup from 'yup';
import {useFieldArray, useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {IDeliveryPoint} from "../../../models/IDeliveryPoint";

interface DeliveryPointsProps {
    deliveryPoints: IDeliveryPoint[];
    setDeliveryPoints: React.Dispatch<React.SetStateAction<IDeliveryPoint[]>>;
}

const schema = yup.object().shape({
    deliveryPoints: yup.array().of(
        yup.object().shape({
            city: yup.string().required('Обязательное поле'),
            address: yup.string().required('Обязательное поле'),
            shopName: yup.string().notRequired(),
            notes: yup.string().notRequired(),
        })
    ),
});


const DeliveryPointsForm: React.FC<DeliveryPointsProps> = ({deliveryPoints, setDeliveryPoints}) => {

    const {
        register,
        handleSubmit,
        control,
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { deliveryPoints },
    });

    useEffect(() => {
        if (deliveryPoints) {
            reset({
                deliveryPoints
            })
        }
    }, [deliveryPoints, reset])

    const { fields, append } = useFieldArray({
        control,
        name: 'deliveryPoints',
    });

    const onSubmit = (data: { deliveryPoints: IDeliveryPoint[] }) => {
        console.log('hey, deliveryPoints')
        setDeliveryPoints(data.deliveryPoints);
    };

    const addDeliveryPoint = () => {
        if (fields.length < 15) {
            append({
                city: "",
                address: "",
                shopName: "",
                notes: ""
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <legend className={'legend'}>Пункты выдачи</legend>
            <p className={'form-shop__p form-shop__p_address'}>
                Добавьте адреса пунктов выдачи, в которых покупатель сможет забрать заказ, оформленный в Вашем магазине.
            </p>
            {fields.map((deliveryPoint, index) => (
                <fieldset className={'form-shop__block-2'} key={index}>
                    {index > 0 && <hr/>}
                    <div className={'input-box'}>
                        <label className={'label required'} htmlFor={`city-shop-${index}`}>Город, населённый пункт</label>
                        <input
                            type="text"
                            id={`city-shop-${index}`}
                            placeholder={'Введите название города'}
                            className={'modalInput form-shop__short'}
                            {...register(`deliveryPoints.${index}.city`)}
                            onInput={handleSubmit(onSubmit)}
                        />
                        {/*{errors.deliveryPoints && errors.deliveryPoints[index] && errors.deliveryPoints[index]?.city && (*/}
                        {/*    <p className="error-message">{errors?.deliveryPoints?.[index]?.city.message}</p>*/}
                        {/*)}*/}
                    </div>
                    <div className={'input-box'}>
                        <label className={'label required'} htmlFor={`point-shop-${index}`}>Адрес</label>
                        <input
                            type="text"
                            id={`point-shop-${index}`}
                            placeholder={'Введите адрес пункта выдачи'}
                            className={'modalInput'}
                            {...register(`deliveryPoints.${index}.address`)}
                            onInput={handleSubmit(onSubmit)}
                        />
                    </div>
                    <div className={'input-box'}>
                        <label className={'label'} htmlFor={`shop-shop-${index}`}>Название магазина, торгового центра, рынка</label>
                        <input
                            type="text"
                            id={`shop-shop-${index}`}
                            placeholder={'Введите название'}
                            className={'modalInput'}
                            {...register(`deliveryPoints.${index}.shopName`)}
                            onInput={handleSubmit(onSubmit)}
                        />
                    </div>
                    <div className={'input-box'}>
                        <label className={'label'} htmlFor={`notes-shop-${index}`}>Примечания</label>
                        <input
                            type="text"
                            id={`notes-shop-${index}`}
                            placeholder={'Введите примечания'}
                            className={'modalInput'}
                            {...register(`deliveryPoints.${index}.notes`)}
                            onInput={handleSubmit(onSubmit)}
                        />
                    </div>
                </fieldset>
            ))}
            <button type="button" className={'button button_light form-shop__add'} onClick={addDeliveryPoint}>
                Добавить ещё пункт выдачи
            </button>
        </form>
    )
}

export default DeliveryPointsForm;