import H1 from "@/components/H1";
import { useRouter } from "next/router"
import addToCart from "@/firebase/addToCart";
import removeFromCart from "@/firebase/removeFromCart";
import firebase from "@/firebase/firebaseClient"
import { useEffect, useState } from "react";
const auth = firebase.auth();
const db = firebase.firestore();

export default function product(props) {
    const router = useRouter();
    const { product } = router.query;
    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)
    const [productData, setProductData] = useState(null)
    useEffect(() => {
        if(product) {
            db.collection("products").doc(product).get().then((doc) => {
                if (doc.exists) {
                    setProductData(doc.data());
                    console.log(doc.data())
                } else {
                    alert("This product does not exist");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [product])
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // uid, displayName, email, emailVerified, photoURL
            setUser(user)
        } else {
            console.log("You are signed out")
        }
    });
    async function addItemToCart() { 
        addToCart(user.uid, product, productData.price)
    }
    async function removeItemFromCart() {
        removeFromCart(user.uid, product);
    }
    useEffect(() => {
        if (user) {
            db.collection("users").doc(user.uid)
            .onSnapshot((doc) => {
                setData(doc.data());
                console.log(doc.data());
            });
        }
    }, [user])
    return <div>
        <div className="hero min-h-92 bg-base-200 flex flex-col gap-16 p-24">
            <div className="hero-content flex-col lg:flex-row-reverse gap-32">
                <img src={productData && productData.imageURL} className="max-w-sm rounded-lg shadow-2xl" />
                <div className="">
                    <h1 className="text-5xl font-bold">{productData ? productData.name : product}</h1>
                    <p className="py-6 w-96">Price: {productData && productData.price}kr</p>
                    {user && data ? 
                    (data.cart[product] ? <button className="btn btn-primary" onClick={() => removeItemFromCart()}>Remove from cart</button> : <button className="btn btn-primary" onClick={() => addItemToCart()}>Add to cart</button>)
                    : 
                    <button className="btn btn-active btn-ghost" disabled>Sign In to add to cart</button>}
                </div>
            </div>
        </div>
    </div>
}