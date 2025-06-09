import {ClerkProvider} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import RootLayout from "./layout/RootLayout.tsx";

export default function App() {
    const clerkPubKey= import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    return (
        <div>
            <ClerkProvider publishableKey={clerkPubKey}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout />}>
                            <Route path={'/'} element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ClerkProvider>
        </div>
    )
}