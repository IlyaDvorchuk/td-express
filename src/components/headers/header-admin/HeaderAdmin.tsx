import React from 'react';
import './header-admin.scss'
import {ADMIN_SCREEN} from "../../../models/enums";

interface IProps {
    currentScreen: ADMIN_SCREEN,
    setCurrentScreen : React.Dispatch<React.SetStateAction<ADMIN_SCREEN>>,
}
const HeaderAdmin = ({currentScreen , setCurrentScreen}: IProps) => {

    const changeLocation = () => {
        window.location.href = "https://www.agroprombank.com/payments/PaymentStart" +
            "?MerchantLogin=000209" +
            "&nivid=122" +
            "&istest=1" +
            "&RequestSum=2700" +
            "&RequestCurrCode=000" +
            "&Desc=оплата.заказа.122" +
            "&SignatureValue=b8720aa391629445b1e3392a2fafa1b3";

    }

    const onTestBankForm = async () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.agroprombank.com/payments/PaymentStart'
        const merchantLoginInput = document.createElement('input');
        merchantLoginInput.type = 'hidden';
        merchantLoginInput.name = 'MerchantLogin';
        merchantLoginInput.value = '000209';
        form.appendChild(merchantLoginInput);

        // Создание других параметров по такой же аналогии
        const nividInput = document.createElement('input');
        nividInput.type = 'hidden';
        nividInput.name = 'nivid';
        nividInput.value = '432';
        form.appendChild(nividInput);

        const isTestInput = document.createElement('input');
        isTestInput.type = 'hidden';
        isTestInput.name = 'istest';
        isTestInput.value = '0';
        form.appendChild(isTestInput);

        const requestSumInput = document.createElement('input');
        requestSumInput.type = 'hidden';
        requestSumInput.name = 'RequestSum';
        requestSumInput.value = '54000';
        form.appendChild(requestSumInput);

        const requestCurrCodeInput = document.createElement('input');
        requestCurrCodeInput.type = 'hidden';
        requestCurrCodeInput.name = 'RequestCurrCode';
        requestCurrCodeInput.value = '000';
        form.appendChild(requestCurrCodeInput);

        const descInput = document.createElement('input');
        descInput.type = 'hidden';
        descInput.name = 'Desc';
        descInput.value = 'Оплата заказа №432';
        form.appendChild(descInput);

        const signatureValueInput = document.createElement('input');
        signatureValueInput.type = 'hidden';
        signatureValueInput.name = 'SignatureValue';
        signatureValueInput.value = '4cefd544c9d43cd3d5cdb1864baf1390';
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
            <button type={'submit'} onClick={onTestBankForm}>Тест банка form</button>
            <button type={'submit'} onClick={changeLocation}>GET редирект</button>
            <form action={'https://www.agroprombank.com/payments/PaymentStart'} method="post">
                <input type="hidden" name="MerchantLogin" value="000209"/>
                <input type="hidden" name="RequestCurrCode" value="000"/>
                <input type="hidden" name={'RequestSum'} value={'54000'}/>
                <input type="hidden" name="nivid" value="431"/>
                <input type="hidden" name="Desc" value="Оплата заказа №431"/>
                <input type="hidden" name="istest" value="0"/>
                <input type="hidden" name={'SignatureValue'} value={'604c0696409ccdc8e604f6131053e9a3'}/>
                <div className="buttons">
                    <div className="pull-right">
                        <input type="submit" value="Подтверждение заказа not nord" className="btn btn-primary"
                        />
                    </div>
                </div>
            </form>
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
