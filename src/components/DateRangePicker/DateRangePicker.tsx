import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
    handleDateRangeChange: (range: { start: Date; end: Date }) => void;
    handleNightsChange: (nights: number) => void;
}

export default function DateRangePicker({
    handleDateRangeChange,
    handleNightsChange,
}: DateRangePickerProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
            setEndDate(nextDay);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    useEffect(() => {
        if (startDate && endDate) {
            handleDateRangeChange({ start: startDate, end: endDate });
            const diffInTime = endDate.getTime() - startDate.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);
            const nights = Math.ceil(diffInDays);
            handleNightsChange(nights);
        }
    }, [startDate, endDate, handleDateRangeChange, handleNightsChange]);

    return (
        <>
            <div className="thin-line lined thin mb-2">
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="text-center p-1 cursor-pointer"
                />
            </div>
            <div className="thin-line lined thin">
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="text-center p-1 cursor-pointer"
                />
            </div>
        </>
    );
}
