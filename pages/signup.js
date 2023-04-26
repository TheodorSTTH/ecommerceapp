import H1 from "@/components/H1";
import firebase from "@/firebase/firebaseClient"
import { useRouter } from 'next/router'

export default function signup() {
    const router = useRouter()

    async function signInWithGitHub() {
        const userCredentials = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider);
        console.log({...userCredentials});
        await firebase.firestore().collection("users").doc(userCredentials.user.uid).set({ 
            cart: {},
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
            provider: userCredentials.user.providerData[0].providerId,
            photoUrl: userCredentials.user.photoURL
        }) // ! Holy shit this is insecure!
        router.push("/")
    }
    
    return <div className="flex flex-col items-center gap-8 py-8">
        <H1>Sign Up</H1>
        <p>Sign up to see your personal information, like your shopping carts</p>
        <button className="btn btn-primary" onClick={() => signInWithGitHub()}>
            Sign Up
        </button>
        <p>If you have an excisting account <a className="link" href="/signin">Sign In</a></p>
    </div>
}