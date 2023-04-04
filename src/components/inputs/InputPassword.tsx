import React, {ChangeEvent, useState} from 'react';
import './input-password.scss'
import {TVisibility} from "../../models/types";

interface IInputPassword {
    password: string,
    onSetPassword: (e: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    className?: string,
    placeholder?: string,
}

const InputPassword = ({password,
                           onSetPassword,
                           label = 'Пароль',
                           className = 'modalInput_light',
                           placeholder = ''}: IInputPassword) => {
    const [visibilityPassword, setVisibilityPassword] = useState<TVisibility>('password')

    const onSwitchVisibility = () => {
        setVisibilityPassword(visibilityPassword === 'password' ? 'text' : 'password')
    }

    return (
        <div className={'input-password'}>
            <label className={'label'} htmlFor={'passwordInput'}>{label}</label>
            <input
                value={password}
                onChange={onSetPassword}
                id={'passwordInput'}
                type={visibilityPassword}
                className={`modalInput ${className}`}
                placeholder={placeholder}
            />
            <div className={'img'}>
                <img
                    src={visibilityPassword === 'password' ? '/images/svg/open-eye.svg' : '/images/svg/close-eye.svg'}
                    alt={''}
                    onClick={onSwitchVisibility}/>
            </div>
        </div>
    );
};

export default InputPassword;