import Link from "next/link"
import firebase from "@/firebase/firebaseClient"
import { useEffect, useState } from "react";
const db = firebase.firestore();

export default function Products() {
    const [products, setProducts] = useState({})
    useEffect(() => {
        db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setProducts(prev => ({
                    ...prev,
                    [doc.id]: doc.data()
                }))
                // console.log(doc.id, " => ", doc.data());
            });
        });
    }, [])
    console.log(products)
    return <div className="flex justify-center flex-wrap gap-6 w-full">
            {
                Object.keys(products).length ? 
                    Object.keys(products).map((product, i) => {
                        return <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="w-full"><img src={products[product].imageURL} className="w-full" alt={products[product].name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{products[product].name}</h2>
                                    <p className="text-gray-500">Price: {products[product].price}kr</p>
                                    <div className="card-actions justify-end">
                                        <Link href={"/products/" + product}>
                                            <button className="btn btn-primary">Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        
                    })
                :
                <div>
                    Loading...
                </div>
            }
        </div>
}