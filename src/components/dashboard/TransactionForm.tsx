import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import {Loader2, Plus} from "lucide-react";
import TransactionField from "@/components/transaction/TransactionField.tsx";
import TransactionTypeToggle from "@/components/transaction/TransactionTypeToggle.tsx";
import TransactionDate from "@/components/transaction/TransactionDate.tsx";
import TransactionCategorySelect from "@/components/transaction/TransactionCategorySelect.tsx";
import useTransactionForm from "@/hooks/forms/useTransactionForm.ts";

export default function TransactionForm() {
    const {
        form,
        control,
        watchedType,
        isCreating,
        getCurrentCategory,
        handleTypeChange,
        handleCategoryChange,
        handleSubmit,
    } = useTransactionForm();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    <h3 className={'font-semibold text-2xl'}>Add Transaction</h3>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TransactionField control={control} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TransactionTypeToggle control={control} onTypeChange={handleTypeChange} />
                            <TransactionDate control={control} />
                            <TransactionCategorySelect
                                type={watchedType}
                                value={getCurrentCategory()}
                                onCategoryChange={handleCategoryChange}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isCreating}>
                            {isCreating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Transaction
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}