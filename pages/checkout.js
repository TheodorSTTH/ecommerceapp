import H1 from "@/components/H1";
import H2 from "@/components/H2";
import ShoppingCart from "@/components/ShoppingCart";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import emptyCart from "@/firebase/emptyCart";
import firebase from "@/firebase/firebaseClient"

export default function Checkout() {
    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const paypalRef = useRef(null);
    let paypalButtons = useRef(null);
    let hasRun = false;
    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // uid, displayName, email, emailVerified, photoURL
            setUser(user)
        } else {
            console.log("You are signed out")
        }
    });
    useEffect(() => {
        if (paidFor) {
            emptyCart(user.uid)
        }
    }, [paidFor])
    useEffect(() => {
        if (hasRun) {
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=AVINcS6gXcJ6wIWPe38ULNTEexOvqJH7g3cuJwCrAO6OQhrNs398LA6bSXgOEETEwkrnJmLfGVDwtgXV";
            
            script.addEventListener("load", () => {
                setLoaded(true);
    
                setTimeout(() => {
                    paypalButtons.current = window.paypal
                        .Buttons({
                            createOrder: (data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        description: "Products from Fantastic Fruits",
                                        amount: {
                                            currency_code: "USD",
                                            value: localStorage.getItem("FantasticFruitsShoppingCartTotal")
                                        }
                                    }]
                                });
                            },
                            onApprove: async (data, actions) => {
                                const order = await actions.order.capture();
                                setPaidFor(true);
                                console.log(order);
                            },
                            onError: err => {
                                console.error(err);
                            },
                        });
                    paypalButtons.current.render(paypalRef.current);
                }, 100);
            });
    
            document.body.appendChild(script);
        }
        hasRun = true;

        return () => {
            if (paypalButtons.current) {
                paypalButtons.current.close();
            }
        };
    }, []);
    return (
        <div className="min-h-screen bg-base-200 p-24">
            {/* <button className="btn btn-secondary" onClick={() => emptyCart(user.uid)}>Empty Cart</button> */}
            {paidFor && loaded ? (
                <div>
                    <H2>Thanks for shopping at Fantastic Fruits</H2>
                    <p>This is not a real ecommerse store. If you want to be reimbursed, email <a href="spamstuff.tst@gmail.com" className="link">spamstuff.tst@gmail.com</a></p>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <H1>
                        Checkout
                    </H1>
                    <ShoppingCart />
                    <div ref={paypalRef}></div>
                    <p>(PS: payment with PayPal does not work online due to me being unable to create a live PayPal project as i am underage)</p>
                </div>
            )}
        </div>
    );
}