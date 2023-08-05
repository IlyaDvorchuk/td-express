import React, {ChangeEventHandler} from 'react';
import './admin-modal.scss'

interface IProps {
    rejectText: string,
    setRejectText:  React.Dispatch<React.SetStateAction<string>>,
    onReject: () => void
}

const AdminModal = ({rejectText, setRejectText, onReject}: IProps) => {
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setRejectText(e.target.value);
    };


    return (
        <div className={'admin-modal'}>
            <h2 className={'admin-modal__title'}>Текст</h2>
            <textarea
                className={'admin-modal__textarea'}
                value={rejectText}
                onChange={onChange}
            />
            <button className={'button admin-modal__button'} onClick={onReject}>
                ОТПРАВИТЬ
            </button>
        </div>
    );
};

export default AdminModal;