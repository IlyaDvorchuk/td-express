import React, {useEffect} from 'react';

const PaymentPage = () => {
    const requestData = new URLSearchParams();
    requestData.append('MerchantLogin', '000209');
    requestData.append('nivid', '122');
    requestData.append('IsTest', '1');
    requestData.append('RequestSum', '2700');
    requestData.append('RequestCurrCode', '000');
    requestData.append('Desc', 'оплата.заказа.122');
    requestData.append('SignatureValue', 'b8720aa391629445b1e3392a2fafa1b3');

    useEffect(() => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.agroprombank.com/payments/PaymentStart';

        requestData.forEach((value, key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }, []);

    return (
        <div>
            Перенаправление на страницу оплаты...
        </div>
    );
};

export default PaymentPage;