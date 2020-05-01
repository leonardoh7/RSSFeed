import { firestore, auth } from '../FirebaseConfig';




export function addChanel(userId, newChanel) {
    firestore.collection('chanels').doc(userId).collection('subchanel').add(newChanel);
}

export function retrieveChanels(userId) {
    return firestore.collection("chanels").doc(userId).collection('subchanel');
}