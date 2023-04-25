import H1 from "@/components/H1";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
    const [paidFor, setPaidFor] = useState(false)
    const [loaded, setLoaded] = useState(false)

    let paypalRef = useRef()

    const product = {
        price: 1.77,
        description: "Fancy Shoe",
        img: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AVINcS6gXcJ6wIWPe38ULNTEexOvqJH7g3cuJwCrAO6OQhrNs398LA6bSXgOEETEwkrnJmLfGVDwtgXV"
        script.addEventListener("load", () => setLoaded(true))
        document.body.appendChild(script);
        if (loaded) {
            setTimeout(() => {
                window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: product.description,
                                amount: {
                                    currency_code: "USD",
                                    value: product.price
                                }
                            }]
                        })
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true)
                        console.log(order)
                    }
                })
                .render(paypalRef)
            })
        }
    })

    return <div>
        {paidFor ? <div>
            Congrats, you have bought this item
        </div> : <div>
            <H1>{product.description} for {product.price}</H1>
            <img src={product.img} className="h-48"/>
            <div ref={v => (paypalRef = v)}></div>
        </div>}
    </div>
}