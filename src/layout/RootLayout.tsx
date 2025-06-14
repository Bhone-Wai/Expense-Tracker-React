import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";

export default function RootLayout() {
    return (
        <div className={'min-h-screen bg-gray-50'}>
            <Header />
            <main className={'max-w-7xl mx-auto p-4'}>
                <Outlet />
            </main>
        </div>
    );
}