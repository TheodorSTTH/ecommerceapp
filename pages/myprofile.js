import H2 from "@/components/H2";
import firebase from "@/firebase/firebaseClient"
import { useState } from "react";

const auth = firebase.auth();
export default function myprofile({}) {
    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // uid, displayName, email, emailVerified, photoURL
            setUser(user)
        } else {
            console.log("You are signed out")
        }
    });
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-200">
        <div className="w-full flex gap-8">
            {
                user ? 
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        <div>
                            <H2>{user.displayName}</H2>
                            <p>Email: {user.email}</p>
                            <p>Is Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
                        </div>
                    </div>
                    <p>You want to delete your data? Send us an email <a className="link" href="mailto:spamstuff.tst@gmail.com">here</a>.</p>
                </div>
                :
                <div>
                    <H2>You are signed out</H2>
                    <p>Sign in <a className="link" href="/signin">here</a> or sign up <a className="link" href="/signup">here</a></p>
                </div>
            }
        </div>
    </div>
}