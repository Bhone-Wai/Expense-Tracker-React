interface TimelineIndicatorProps {
    isActive: boolean;
}

export function TimelineIndicator({ isActive }: TimelineIndicatorProps) {
    return (
        <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <div className="w-px h-16 bg-gray-200 mt-2"></div>
        </div>
    );
}