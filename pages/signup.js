import H1 from "@/components/H1";
import firebase from "@/firebase/firebaseClient"

export default function signup() {
    async function signInWithGitHub() {
        const userCredentials = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider);
        console.log({...userCredentials});
        firebase.firestore().collection("users").doc(userCredentials.user.uid).set({ 
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
            provider: userCredentials.user.providerData[0].providerId,
            photoUrl: userCredentials.user.photoURL
        }) // ! Holy shit this is insecure!
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