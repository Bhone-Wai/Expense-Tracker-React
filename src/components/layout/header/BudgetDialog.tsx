import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog.tsx";
import {Button} from "../../ui/button.tsx";
import {Save, Settings} from "lucide-react";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import useBudgetForm from "@/hooks/forms/useBudgetForm.ts";
import BudgetField from "@/components/budget-overview/BudgetField.tsx";
import {formatCurrencyTHB, getCategoryMeta} from "@/lib/utils.ts";
import {EXPENSE_CATEGORIES} from "@/types/enums.ts";

export default function BudgetDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        budgetsState,
        handleChange,
        total,
        handleSubmit,
        isSubmitting,
        isSuccess
    } = useBudgetForm(isOpen);

    const currentMonthYear = format(new Date(), 'MMM yyyy');

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Settings className={'h-4 w-4 mr-2'} />
                    Budget Setting
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Budget Plan for {currentMonthYear}</DialogTitle>
                    <DialogDescription>Set your monthly budget goals for each category.</DialogDescription>
                </DialogHeader>

                <form onSubmit={e => {
                    e.preventDefault();
                    handleSubmit()
                }} className={'space-y-4'}>
                    {(EXPENSE_CATEGORIES).map((category) => {
                        const categoryInfo = getCategoryMeta('EXPENSE', category);
                        const IconComponent = categoryInfo?.icon;

                        return (
                            <BudgetField
                                key={category}
                                id={`budget-${category.toLowerCase()}`}
                                label={`${categoryInfo?.label || category} Budget`}
                                icon={IconComponent ? <IconComponent className="h-4 w-4" /> : null}
                                value={budgetsState[category]}
                                onChange={(value) => handleChange(category, value)}
                            />
                        );
                    })}

                    <Separator />

                    <div className={'flex justify-between items-center'}>
                        <span className={'font-medium'}>Total Budget:</span>
                        <span className="text-lg font-bold">
                            {formatCurrencyTHB(total)}
                        </span>
                    </div>

                    <Button
                        type={"submit"}
                        className={'w-full'}
                        disabled={isSubmitting}
                    >
                        <Save className={'h-4 w-4 mr-2'} />
                        {isSubmitting ? 'Saving...' : 'Save Budget Plan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}