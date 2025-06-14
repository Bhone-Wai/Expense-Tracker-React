import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.tsx";
import {Button} from "../ui/button.tsx";
import {Home, PiggyBank, Save, Settings, ShoppingCart} from "lucide-react";
import {format} from "date-fns";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function BudgetDialog() {
    const [budgetNeed, setBudgetNeed] = useState(0);
    const [budgetWant, setBudgetWant] = useState(0);
    const [budgetSave, setBudgetSave] = useState(0);

    const formatCurrency = (amount: number) =>
        amount.toLocaleString("th-TH", { style: 'currency', currency: 'THB' });

    const handleSubmitBudget = () => {
        console.log('Submit');
    }

    const now = new Date();
    const currentMonthYear = format(now, 'MMM yyy')
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Settings className={'h-4 w-4 mr-2'} />
                    Budget Plan
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Budget Plan for {currentMonthYear}</DialogTitle>
                    <DialogDescription>Set your monthly budget goals for each category.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmitBudget} className={'space-y-4'}>
                    {[
                        {
                            id: "budget-need",
                            label: "Need Budget",
                            icon: <Home className="h-4 w-4 text-blue-600" />,
                            value: budgetNeed,
                            setter: setBudgetNeed,
                        },
                        {
                            id: "budget-want",
                            label: "Want Budget",
                            icon: <ShoppingCart className="h-4 w-4 text-purple-600" />,
                            value: budgetWant,
                            setter: setBudgetWant,
                        },
                        {
                            id: "budget-save",
                            label: "Save Budget",
                            icon: <PiggyBank className="h-4 w-4 text-green-600" />,
                            value: budgetSave,
                            setter: setBudgetSave,
                        },
                    ].map((field) => (
                        <div className={'space-y-2'} key={field.id}>
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <div className={'flex items-center gap-2'}>
                                {field.icon}
                                <Input
                                    id={field.id}
                                    type={"number"}
                                    step={'0.01'}
                                    value={field.value}
                                    onChange={e => field.setter(parseFloat(e.target.value))}
                                    placeholder={'0.00'}
                                />
                            </div>
                        </div>
                    ))}
                    <Separator />
                    <div className={'flex justify-between items-center'}>
                        <span className={'font-medium'}>Total Budget:</span>
                        <span className="text-lg font-bold">
                            {formatCurrency(budgetNeed + budgetWant + budgetSave)}
                        </span>
                    </div>
                    <Button type={"submit"} className={'w-full'}>
                        <Save className={'h-4 w-4 mr-2'} />
                        Save Budget Plan
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}