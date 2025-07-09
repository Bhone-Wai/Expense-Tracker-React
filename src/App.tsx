import './App.css'
import {ClerkProvider} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "@/pages/Dashboard.tsx";
import RootLayout from "@/components/layout/RootLayout.tsx";
import Transaction from "@/pages/Transaction.tsx";
import BudgetOverview from "@/pages/BudgetOverview.tsx";
import MonthlyHistory from "@/pages/MonthlyHistory.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient();

export default function App() {
    const clerkPubKey: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout />}>
                            <Route path={'/'} element={<Dashboard />} />
                            <Route path={'/transactions'} element={<Transaction />} />
                            <Route path={'/budget-overview'} element={<BudgetOverview />} />
                            <Route path={'/monthly-history'} element={<MonthlyHistory />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </QueryClientProvider>
        </ClerkProvider>
    );
}