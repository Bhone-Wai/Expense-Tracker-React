import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";

interface BudgetFieldProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    value: number;
    onChange: (value: number) => void;
}

export default function BudgetField({ id, label, icon, value, onChange }: BudgetFieldProps) {
    return (
        <div className={'space-y-2'}>
            <Label htmlFor={id}>{label}</Label>
            <div className={'flex items-center gap-2'}>
                {icon}
                <Input
                    id={id}
                    type={'number'}
                    step={'1'}
                    min={0}
                    value={value || 0}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                />
            </div>
        </div>
    );
}