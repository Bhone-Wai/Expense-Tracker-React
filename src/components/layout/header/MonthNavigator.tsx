import {format} from "date-fns";

export default function MonthNavigator() {
    const now = new Date();
    const currentMonthYear = format(now, 'MMM yyy');

    return (
        <div>
            {currentMonthYear}
        </div>
    );
}