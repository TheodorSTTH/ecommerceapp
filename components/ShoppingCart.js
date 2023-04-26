import H2 from "@/components/H2";
import { useState, useEffect } from "react";
import firebase from "@/firebase/firebaseClient"
import Link from "next/link";
const db = firebase.firestore();

export default function ShoppingCart({}) {
    const [userDocData, setUserDocData] = useState(null)
    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user)
            // console.log(user)
        } else {
            console.log("You are signed out")
        }
    });
    useEffect(() => {
        if(user) {
            db.collection("users").doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    setUserDocData(doc.data());
                    console.log()
                    let tot = 0
                    const cart = doc.data().cart
                    const cartKeys = Object.keys(cart);
                    cartKeys.forEach(key => {
                        if (cart[key]) tot += cart[key];
                    })
                    localStorage.setItem("FantasticFruitsShoppingCartTotal", tot);
                    console.log(doc.data())
                } else {
                    alert("There is a problem with this checkout, do not use it");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [user])
    return <div className="flex flex-col items-center justify-between bg-base-200">
        <div className="flex flex-col items-start w-full">
            <div className="overflow-x-auto border-8 border-white rounded-xl w-96">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                let count = 0;
                                return userDocData && userDocData.cart && Object.keys(userDocData.cart).map((item, i) => {
                                    if (userDocData.cart[item]) {
                                        count++;
                                        return <tr key={i}>
                                            <th>{count}</th>
                                            <td>{item}</td>
                                            <td>{userDocData.cart[item]}</td>
                                        </tr>
                                    }
                                })
                            })()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}