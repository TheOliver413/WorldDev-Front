import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore';

export default async function SendRecibo(email) {
    const collectionReft = collection(db, 'mail');

    const emailContent = {
        to: email,
        message: {
            subject: 'Hotel Receipt',
            text: 'Here you have the current offers of our hotels',
            html: `<h1>{Hotel Receipt}</h1> <p>Here you have the invoice of your reservation</p>
            <a href='https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTHY2aXlBZ1Z6N2dTU0ttKOPg_5oGMgayfxdfs8c6LBa8ClNJLcTA9gTjXhhX2ICTLSwL_lnhsmF_rLxnazlx1fjgEgPRzOI0tE2e'> look at your bill</a>`,
        }
    }
    console.log('listo para ser enviado');
    await addDoc(collectionReft, emailContent);
return
}
