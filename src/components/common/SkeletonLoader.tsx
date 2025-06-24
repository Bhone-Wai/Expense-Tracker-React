import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface SummarySkeletonCardProps {
    title: string;
    lines?: number;
}

export function SummarySkeletonCard({ title, lines = 3 }: SummarySkeletonCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.from({ length: lines }).map((_, index) => (
                    <Skeleton key={index} className={'h-6 w-full'}/>
                ))}
            </CardContent>
        </Card>
    );
}

interface TransactionSkeletonProps {
    title: string;
    lines?: number;
}

export function TransactionSkeleton({title, lines = 4}: TransactionSkeletonProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-2xl font-semibold'}>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Simple skeleton items */}
                {Array.from({ length: lines }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                        <Skeleton className="h-5 w-16" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}