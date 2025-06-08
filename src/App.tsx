import {ClerkProvider} from "@clerk/clerk-react";
import {BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";

export default function App() {
    const clerkPubKey= import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    return (
        <div>
            <ClerkProvider publishableKey={clerkPubKey}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </ClerkProvider>
        </div>
    )
}