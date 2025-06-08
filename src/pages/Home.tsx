import {RedirectToSignIn, SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";

export default function Home() {
    return (
        <div>
            <SignedIn>
                <UserButton />
                <p>Welcome to the app!</p>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
    )
}