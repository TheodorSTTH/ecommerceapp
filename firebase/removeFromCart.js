import firebase from "@/firebase/firebaseClient"

export default async function removeFromCart(uid, name) {
    await firebase.firestore().collection("users").doc(uid).update({ 
        [`cart.${name}`]: null
    })
}