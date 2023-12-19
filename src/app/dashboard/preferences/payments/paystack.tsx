import { useContext } from 'react';
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import { State_data } from '../../context/context';
import { customerAPIUrl } from '../../services/api-url/customer-api-url';
import { authorizationKeyCustomer } from '../../services/customer-api/api';

export default function PayStackHookExample({style, amount, text}: any) {
    const {staffDetails} = useContext(State_data)
    const config = {
        reference: (new Date()).getTime().toString(),
        email: staffDetails?.email || 'claence.emy@gmail.com',
        amount: amount ? amount : 10000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_625a031d835afadd0392ce65786870456e2a0269',
    };
        
    async function handleAddCard(card: any){
        const response = await fetch(customerAPIUrl.createCard, {
            method: 'POST',
            body: JSON.stringify(card),
            headers: {
                'Authorization': authorizationKeyCustomer
            },
          });
        const data = await response.json();
        return data;
    }

    const handlePaystackSuccessAction = (reference: any) => {
        // Implementation for whatever you want to do with reference and after success call.
        handleAddCard({reference: config.reference, userId: staffDetails?.userId, email: staffDetails?.email})
        console.log(reference);
      };
    
      // you can call this function anything
      const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }

      const componentProps = {
        ...config,
        text: text ? text : 'Add card with Paystack',
        onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
      <div className={style ? style : 'bg-amber-500 my-5 rounded-lg p-2 w-fit text-gray-50'}>
        <PaystackButton {...componentProps}/>
      </div>
    );
}