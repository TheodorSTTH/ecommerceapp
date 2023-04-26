import H2 from "@/components/H2";
import Link from "next/link";
import ShoppingCart from "@/components/ShoppingCart";


export default function shoppingcart({}) {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-200">
        <div className="flex flex-col items-start w-full">
            <H2>Shopping Cart</H2>
            <br />
            <ShoppingCart />
            <Link href="/checkout">
                <button className="btn btn-primary mt-8">Go to checkout</button>
            </Link>
        </div>
    </div>
}