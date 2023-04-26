import firebase from "@/firebase/firebaseClient"

export default async function emptyCart(uid) {
    await firebase.firestore().collection("users").doc(uid).update({ 
        "cart": null
    })
    await firebase.firestore().collection("users").doc(uid).update({ 
        "cart": {}
    })
}