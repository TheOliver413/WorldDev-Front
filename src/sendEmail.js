import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore';

export default async function sendEmail(email) {
    const collectionReft = collection(db, 'mail');

    const emailContent = {
        to: email,
        message: {
            subject: 'Hotel Deals',
            text: 'Here you have the current offers of our hotels',
            html: `<h1>Hotel Deals</h1> <p>Here you have the current offers of our hotels</p>`,
        }
    }
    console.log('listo para ser enviado');
    await addDoc(collectionReft, emailContent);
}