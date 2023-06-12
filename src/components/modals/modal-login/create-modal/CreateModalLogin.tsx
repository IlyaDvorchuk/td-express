import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { TVisibility } from "../../../../models/types";
import { createNewPasswordShelter } from "../../../../store/reducers/shelter/ShelterCreator";
import { registrationUser } from "../../../../store/reducers/user/UserCreators";
import './create-modal-login.scss';

interface ICreateModalLogin {
  closeUserModal: () => void,
  forgotPassword?: boolean
}

const CreateModalLogin = ({ closeUserModal, forgotPassword = false }: ICreateModalLogin) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userReducer);
  const { email } = useAppSelector(state => state.shelterReducer.shelter);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [visibilityPassword, setVisibilityPassword] = useState<TVisibility>('password');
  const [visibilityRepeat, setVisibilityRepeat] = useState<TVisibility>('password');
  const [error, setError] = useState(false);

  const onSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  const onSetRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    setError(false);
  };

  const onSwitchVisibility = (index: number) => {
    if (index === 0) {
      setVisibilityPassword(visibilityPassword === 'password' ? 'text' : 'password');
    } else if (index === 1) {
      setVisibilityRepeat(visibilityRepeat === 'password' ? 'text' : 'password');
    }
  };

  const onFinalRegistry = () => {
    if (password.trim() === repeatPassword.trim()) {
      dispatch(registrationUser(user, password));
      closeUserModal();
    } else {
      setError(true);
    }
  };

  const onNewPassword = () => {
    if (password.trim() === repeatPassword.trim()) {
      dispatch(createNewPasswordShelter(email, password));
      closeUserModal();
    } else {
      setError(true);
    }
  };

  return (
    <div className={'creatModal'}>
      <h3 className={'userAuthModal__title creatModal__title'}>Придумайте надёжный пароль</h3>
      <div className={'userAuthModal__form'}>
        <label className={'userAuthModal__label'} htmlFor={'passwordInput'}>Введите пароль</label>
        <input value={password} onChange={onSetPassword} id={'passwordInput'} type={visibilityPassword} className={`modalInput creatModal__password`} />
        <img src={'/images/svg/open-eye.svg'} className={'img'} alt={''} onClick={() => onSwitchVisibility(0)} />
      </div>
      <div className={'userAuthModal__form'}>
        <label className={'userAuthModal__label'} htmlFor={'repeatPasswordInput'}>Введите пароль еще раз</label>
        <input
          value={repeatPassword}
          onChange={onSetRepeatPassword}
          id={'repeatPasswordInput'}
          type={visibilityRepeat}
          className={`modalInput creatModal__repeat-password`}
        />
        <img src={'/images/svg/open-eye.svg'} className={'img'} onClick={() => onSwitchVisibility(1)} alt={''} />
        {error && <p className={'warningLogin creatModal__warningLogin'}>Пароли не совпадают. Проверьте правильность ввода.</p>}
      </div>
      {!forgotPassword ?
        <button className={'button button_dark'} onClick={onFinalRegistry}>ЗАВЕРШИТЬ РЕГИСТРАЦИЮ</button>
        :
        <button className={'button button_dark'} onClick={onNewPassword}> Создать Новый пароль</button>
      }
    </div>
  );
};

export default CreateModalLogin;
