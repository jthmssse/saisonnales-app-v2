import React from 'react';

interface StatusBadgeProps {
    isPositive: boolean;
    positiveText: string;
    negativeText: string;
    negativeColor?: 'gray' | 'red';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isPositive, positiveText, negativeText, negativeColor = 'gray' }) => {
    const positiveClasses = 'text-green-600';
    const negativeClasses = 'text-[#cc5500]';

    return (
        <span className={`font-semibold ${isPositive ? positiveClasses : negativeClasses}`}>
            {isPositive ? positiveText : negativeText}
        </span>
    );
};

export default StatusBadge;