import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore';

export default async function sendEmail(email, subject, body) {
    const collectionReft = collection(db, 'mail');

    const emailContent = {
        to: email,
        message: {
            subject: subject,
            text: body,
            html: `<p>${body}</p>`,
        }
    }
    console.log('listo para ser enviado');
    await addDoc(collectionReft, emailContent);
}