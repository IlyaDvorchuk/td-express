import React, {ChangeEvent, useState} from 'react';
import './input-password.scss'
import {TVisibility} from "../../../models/types";

interface IInputPassword {
    password: string,
    onSetPassword: (e: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    className?: string,
    placeholder?: string,
    error?: boolean
}

const InputPassword = ({password,
                           onSetPassword,
                           label = 'Пароль',
                           className = 'modalInput_light',
                            error = false,
                           placeholder = ''}: IInputPassword) => {
    const [visibilityPassword, setVisibilityPassword] = useState<TVisibility>('password')

    const onSwitchVisibility = () => {
        setVisibilityPassword(visibilityPassword === 'password' ? 'text' : 'password')
    }

    return (
        <div className={'input-password'}>
            <label className={`label ${error ? 'error' : ''}`} htmlFor={'passwordInput'}>{label}</label>
            <input
                value={password}
                onChange={onSetPassword}
                id={'passwordInput'}
                type={visibilityPassword}
                className={`modalInput ${className} ${error && 'error'}`}
                placeholder={placeholder}
            />
            <div className={'img'}>
                <img
                    src={visibilityPassword === 'password' ? '/images/svg/open-eye.svg' : '/images/svg/close-eye.svg'}
                    alt={''}
                    onClick={onSwitchVisibility}/>
            </div>
            {error && <p className={'warning-input warning-input_bottom'}>Вы ввели некорректный пароль</p>}
        </div>
    );
};

export default InputPassword;