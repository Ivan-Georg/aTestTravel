import React, {ChangeEvent} from "react";
import cities from '@/data/cities.json';

interface ActivityListProps {
    selectedCity: string,
    handleActivitiesChange?: (activity: string, checked: boolean) => void
}

export default function ActivityList({selectedCity, handleActivitiesChange}: ActivityListProps) {
    const city = cities.find(city => city.name === selectedCity);
    
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (handleActivitiesChange) {
        handleActivitiesChange(target.value, target.checked);
        }
    }

    return (
        <div className="activityContainer">
            <h4 className="text-xl mb-1">Activities in {selectedCity}</h4>
            {city && (
                <ul>
                    {city.activities.map((activity, idx) => (
                        <li key={idx}>
                            <label>
                                <input type="checkbox" value={activity} onChange={handleCheckboxChange}  className="mr-2" />
                                {activity}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}