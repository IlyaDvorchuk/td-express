import React from 'react';
import './header-admin.scss'
import {ADMIN_SCREEN} from "../../../models/enums";
import {UserService} from "../../../services/UserService";

interface IProps {
    currentScreen: ADMIN_SCREEN,
    setCurrentScreen : React.Dispatch<React.SetStateAction<ADMIN_SCREEN>>,
}
const HeaderAdmin = ({currentScreen , setCurrentScreen}: IProps) => {

    const onTestBankPost = async () => {
        const response = await UserService.setBank();
        const responseText = await response.text();
        // setBankPageContent(responseText); // Сохраняем HTML-код в состояние
        // if (response?.url) {
            // window.location.href = response?.url;
        // }
        console.log('response formData', responseText);
    };

    const onTestBankForm = async () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.agroprombank.com/payments/PaymentStart'
        const merchantLoginInput = document.createElement('input');
        merchantLoginInput.type = 'hidden';
        merchantLoginInput.name = 'MerchantLogin';
        merchantLoginInput.value = '000209';
        form.appendChild(merchantLoginInput);

        const nividInput = document.createElement('input');
        nividInput.type = 'hidden';
        nividInput.name = 'nivid';
        nividInput.value = '122';
        form.appendChild(nividInput);

        const isTestInput = document.createElement('input');
        isTestInput.type = 'hidden';
        isTestInput.name = 'IsTest';
        isTestInput.value = '1';
        form.appendChild(isTestInput);

        const requestSumInput = document.createElement('input');
        requestSumInput.type = 'hidden';
        requestSumInput.name = 'RequestSum';
        requestSumInput.value = '2700';
        form.appendChild(requestSumInput);

        const requestCurrCodeInput = document.createElement('input');
        requestCurrCodeInput.type = 'hidden';
        requestCurrCodeInput.name = 'RequestCurrCode';
        requestCurrCodeInput.value = '000';
        form.appendChild(requestCurrCodeInput);

        const descInput = document.createElement('input');
        descInput.type = 'hidden';
        descInput.name = 'Desc';
        descInput.value = 'оплата.заказа.122';
        form.appendChild(descInput);

        const signatureValueInput = document.createElement('input');
        signatureValueInput.type = 'hidden';
        signatureValueInput.name = 'SignatureValue';
        signatureValueInput.value = 'b8720aa391629445b1e3392a2fafa1b3';
        form.appendChild(signatureValueInput);
        console.log('form', form)
        document.body.appendChild(form);
        form.submit();
    };


    return (
        <div className={'header-admin'}>
            <p className={'header-admin__logo'}>
                Панель администратора
            </p>
            <button onClick={onTestBankPost}>Тест банка post</button>
            <button onClick={onTestBankForm}>Тест банка form</button>
            <div className={'header-admin__links'}>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.GENERAL)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.GENERAL ? 800 : 400}}>
                    Главная
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_AD)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_AD ? 800 : 400}}>
                    Модерация объявлений
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_SELLERS)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_SELLERS ? 800 : 400}}>
                    Модерация регистрируемых продавцов
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.PRODUCT_LIST)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.PRODUCT_LIST ? 800 : 400}}>
                    Список товаров доставляемых товаров
                </div>
            </div>
            {/*{bankPageContent && <div dangerouslySetInnerHTML={{ __html: bankPageContent }} />}*/}
        </div>
    );
};

export default HeaderAdmin;
