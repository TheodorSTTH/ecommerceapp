import firebase from "@/firebase/firebaseClient"

export default async function addToCart(uid, name, price) {
    await firebase.firestore().collection("users").doc(uid).update({ 
        [`cart.${name}`]: price
    })
}