import React, {ChangeEvent} from 'react';
import './checkbox.scss'

interface IProps {
    sizes: number,
    isChecked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ sizes, isChecked, onChange = () => {} }: IProps) => {
    return (
        <label className="checkbox-container" style={{ width: sizes, height: sizes }}>
            <input type="checkbox" className="custom-checkbox" checked={isChecked} onChange={onChange} />
            <span className="checkmark"  style={{ width: sizes, height: sizes }}>
                <img src={'/images/svg/check.svg'} alt="Check" className="check-icon" />
            </span>
            {/* Текст для чекбокса */}
        </label>
    );
};

export default Checkbox;
