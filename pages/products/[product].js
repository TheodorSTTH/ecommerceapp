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
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // uid, displayName, email, emailVerified, photoURL
            setUser(user)
        } else {
            console.log("You are signed out")
        }
    });
    async function addItemToCart() { 
        addToCart(user.uid, product, 100)
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
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div className="">
                    <h1 className="text-5xl font-bold">Jogging shoe 1956</h1>

                    <p className="py-6 w-96">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {user && data ? 
                    (data.cart[product] ? <button className="btn btn-primary" onClick={() => removeItemFromCart()}>Remove from cart</button> : <button className="btn btn-primary" onClick={() => addItemToCart()}>Add to cart</button>)
                    : 
                    <button className="btn btn-active btn-ghost" disabled>Sign In to add to cart</button>}
                </div>
            </div>
            <div className="py-24">
                <H1>Showcase</H1>
                <br></br>
                <div className="carousel rounded-box w-full">
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Burger" />
                    </div>
                </div>
            </div>
        </div>
    </div>
}