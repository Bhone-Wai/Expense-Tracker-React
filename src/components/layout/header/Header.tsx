import {Calendar} from "lucide-react";
import {SignedIn, SignedOut, SignInButton, useAuth, UserButton} from "@clerk/clerk-react";
import MonthNavigator from "@/components/layout/header/MonthNavigator.tsx";
import BudgetDialog from "@/components/layout/header/BudgetDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

export default function Header() {
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        const fetchToken = async () => {
            await getToken();
        }
        fetchToken();
    }, [isSignedIn]);

    return (
        <header className={'bg-background border-b border-gray-200 text-foreground px-4 py-4'}>
            <div className={'max-w-7xl mx-auto flex items-center justify-between'}>
                {/* Left Side: Logo + Month Navigator */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Expense Tracker</h1>
                        <MonthNavigator />
                    </div>
                </div>

                {/* Right Side: Transactions + Dialog */}
                <div className="flex items-center gap-3">
                    <BudgetDialog />

                    <SignedIn>
                        {/* 👤 Show user avatar if signed in */}
                        <UserButton />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <Button>Sign in</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}