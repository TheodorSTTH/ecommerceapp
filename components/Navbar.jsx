import Link from "next/link";
import firebase from "@/firebase/firebaseClient"
import { useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // uid, displayName, email, emailVerified, photoURL
            setUser(user)
        } else {
            console.log("You are signed out")
        }
    });
    return <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href="/">Homepage</a></li>
                    <li><a href="/cookiepolicy">Cookie Policy</a></li>
                    <li><a href="/privacypolicy">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        <div className="navbar-center">
            <Link legacyBehavior href="/">
                <a className="btn btn-ghost normal-case text-xl">Fantastic Fruits</a>
            </Link>
        </div>
        <div className="navbar-end">
            {
                user ?
                <>
                    <Link href="/myprofile">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button>
                    </Link>
                    <Link href="/shoppingcart">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                            </div>
                        </button>
                    </Link>
                </>
                :
                <div className="flex gap-4">
                    <Link href="/signin">
                        <button className="btn btn-ghost">Sign In</button>
                    </Link>
                    <Link href="/signup">
                        <button className="btn btn-primary">Sign Up</button>
                    </Link>
                </div>
            }
            
        </div>
    </div>
}