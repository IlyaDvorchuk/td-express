import React from 'react';
import './header-admin.scss'
import {ADMIN_SCREEN} from "../../../models/enums";
import {UserService} from "../../../services/UserService";

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

        // Создание других параметров по такой же аналогии
        const nividInput = document.createElement('input');
        nividInput.type = 'hidden';
        nividInput.name = 'nivid';
        nividInput.value = '122';
        form.appendChild(nividInput);

        const isTestInput = document.createElement('input');
        isTestInput.type = 'hidden';
        isTestInput.name = 'istest';
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

    const onTestBankPostAndRedirect = async () => {
        const requestData = new URLSearchParams();
        requestData.append('MerchantLogin', '000209')
        requestData.append('nivid', '122')
        requestData.append('istest', '1')
        requestData.append('RequestSum', '2700')
        requestData.append('RequestCurrCode', '000')
        requestData.append('Desc', 'оплата.заказа.122')
        requestData.append('SignatureValue', 'b8720aa391629445b1e3392a2fafa1b3')

        const url = 'https://www.agroprombank.com/payments/PaymentStart';

        const requestOptions = {
            method: 'POST',
            body: requestData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            }
        };

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.text();

            // Получите URL из результата и выполните редирект
            const parser = new DOMParser();
            const doc = parser.parseFromString(result, 'text/html');
            // @ts-ignore
            const redirectUrl = doc.querySelector('a').href;

            window.location.href = redirectUrl;
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    return (
        <div className={'header-admin'}>
            <p className={'header-admin__logo'}>
                Панель администратора
            </p>
            <button type={'submit'} onClick={onTestBankPost}>Тест банка post</button>
            <button type={'submit'} onClick={onTestBankForm}>Тест банка form</button>
            <button type={'submit'} onClick={onTestBankPostAndRedirect}>Тест банка редирект</button>
            <button type={'submit'} onClick={changeLocation}>GET редирект</button>
            <form action={'https://www.agroprombank.com/payments/PaymentStart'}>
                <input type="hidden" name={'MerchantLogin'} value={'000209'}/>
                <input type="hidden" name={'nivid'} value={'122'}/>
                <input type="hidden" name={'RequestSum'} value={'2700'}/>
                <input type="hidden" name={'RequestCurrCode'} value={'000'}/>
                <input type="hidden" name={'Desc'} value={'оплата.заказа.122'}/>
                <input type="hidden" name={'istest'} value={'1'}/>
                <input type="hidden" name={'SignatureValue'} value={'SignatureValue'}/>
                <div className="buttons">
                    <div className="pull-right">
                        <input type="submit" value="Подтверждение заказа" className="btn btn-primary"
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
