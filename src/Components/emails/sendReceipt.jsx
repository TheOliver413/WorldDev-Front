import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore';

export default async function SendRecibo(email, receipt_url) {
    const collectionReft = collection(db, 'mail');

    const emailContent = {
        to: email,
        message: {
            subject: 'Hotel Receipt',
            text: 'Here you have the current offers of our hotels',
            html: `<h1>{Hotel Receipt}</h1> <p>Here you have the invoice of your reservation</p>
            <a href=${receipt_url}> look at your bill</a>`,
        }
    }
    console.log('listo para ser enviado');
    await addDoc(collectionReft, emailContent);
return
}
