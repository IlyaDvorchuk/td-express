import React from 'react';
import './delivery-point.scss'
import {Controller, useForm} from "react-hook-form";
import classNames from "classnames";
import {IDeliveryPoint2} from "../../models/IDeliveryPoint";

interface IProps {
    point: IDeliveryPoint2,
    index: number,
    handleCheckboxChange(index: number): (checked: boolean) => void,
    checkedBoxes: boolean[]
}

const DeliveryPoint = ({point, index, handleCheckboxChange, checkedBoxes}: IProps) => {
    const { control } = useForm();

    return (
        <div className="delivery-point">
            <Controller
                name={`checkbox-${point._id}`}
                defaultValue={false}
                control={control}
                render={({ field }) => (
                    <input
                        id={`${point._id}`}
                        className="create-good__checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleCheckboxChange(index)(e.target.checked);
                        }}
                        checked={checkedBoxes[index]}
                    />
                )}
            />
            <label
                className={classNames('delivery-point__inf', {
                    'delivery-point__inf_selected': checkedBoxes[index],
                })}
                htmlFor={`checkbox-${point._id}`}
            >
                <p>{point.city}</p>
                <p>{point.address}</p>
                {point.shopName && <p>{point.shopName}</p>}
                {point.notes && <p>{point.notes}</p>}
            </label>
        </div>
    );
};

export default DeliveryPoint;
