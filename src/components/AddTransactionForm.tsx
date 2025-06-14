import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Briefcase,
    DollarSign,
    Gift,
    Home,
    LineChart,
    PiggyBank,
    Plus,
    ShoppingCart,
    TrendingDown,
    TrendingUp
} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function AddTransactionForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Transaction
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter transaction title"
                                value={'Title'}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={69}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <div className="flex gap-2">
                                <Toggle
                                    pressed={type === "income"}
                                    onPressedChange={() => handleTypeChange("income")}
                                    className="flex-1 data-[state=on]:bg-green-100 data-[state=on]:text-green-800"
                                >
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Income
                                </Toggle>
                                <Toggle
                                    pressed={type === "expense"}
                                    onPressedChange={() => handleTypeChange("expense")}
                                    className="flex-1 data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
                                >
                                    <TrendingDown className="h-4 w-4 mr-2" />
                                    Expense
                                </Toggle>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={(value: TransactionCategory) => setCategory(value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Conditional rendering of category options based on transaction type */}
                                    {type === "income" ? (
                                        <>
                                            <SelectItem value="SALARY">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4" />
                                                    SALARY
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="FREELANCE">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    FREELANCE
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="BONUS">
                                                <div className="flex items-center gap-2">
                                                    <Gift className="h-4 w-4" />
                                                    BONUS
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="INVESTMENT">
                                                <div className="flex items-center gap-2">
                                                    <LineChart className="h-4 w-4" />
                                                    INVESTMENT
                                                </div>
                                            </SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="NEED">
                                                <div className="flex items-center gap-2">
                                                    <Home className="h-4 w-4" />
                                                    NEED
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="WANT">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingCart className="h-4 w-4" />
                                                    WANT
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="SAVE">
                                                <div className="flex items-center gap-2">
                                                    <PiggyBank className="h-4 w-4" />
                                                    SAVE
                                                </div>
                                            </SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Transaction
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}