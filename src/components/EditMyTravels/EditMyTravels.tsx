import React, { useState, useEffect, useCallback } from "react";
import { getTravelById, updateTravel } from "../../database"; // Importera de nödvändiga funktionerna
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import NightsCounter from "@/components/NightsCounter/NightsCounter";
import CityList from "@/components/CityList/CityList";
import ActivityList from "@/components/ActivityList/ActivityList";

type Props = {
    travelId: number;
    onClose: () => void;
};

const EditTravelPlan: React.FC<Props> = ({ travelId, onClose }) => {
    const [travelPlan, setTravelPlan] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [nights, setNights] = useState(0);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const data = await getTravelById(travelId);
                if (data) {
                    setTravelPlan(data);
                    setSelectedCity(data.city);
                    setDateRange(data.dateRange);
                    setSelectedActivities(data.activity);
                    setNights(data.nights);
                    setNotes(data.notes);
                }
            } catch (error) {
                console.error("Error fetching travel:", error);
                setError("Failed to fetch travel");
            }
        };

        fetchTravel();
    }, [travelId]);

    const handleActivitiesChange = useCallback((activity: string, checked: boolean) => {
        if (checked) {
            setSelectedActivities((prevActivities) => [...prevActivities, activity]);
        } else {
            setSelectedActivities((prevActivities) => prevActivities.filter((a) => a !== activity));
        }
    }, []);

    const handleSave = useCallback(async () => {
        if (travelPlan) {
            try {
                await updateTravel({
                    ...travelPlan,
                    city: selectedCity,
                    dateRange,
                    activity: selectedActivities,
                    nights,
                    notes,
                });
                alert("Travel updated successfully!");
                onClose();
            } catch (error) {
                console.error("Error updating travel:", error);
                setError("Failed to update travel");
            }
        }
    }, [
        travelPlan,
        selectedCity,
        dateRange,
        selectedActivities,
        nights,
        notes,
        updateTravel,
        onClose,
    ]);

    return (
        <div>
            <h1>Edit Travel Plan</h1>
            <form onSubmit={handleSave}>
                <CityList
                    selectedCity={selectedCity}
                    handleCityChange={(e) => setSelectedCity(e.target.value)}
                />
                <DateRangePicker
                    handleDateRangeChange={(range) => setDateRange(range)}
                    handleNightsChange={(nights) => setNights(nights)}
                />

                <ActivityList
                    selectedCity={selectedCity}
                    handleActivitiesChange={handleActivitiesChange}
                />
                <NightsCounter selectedCity={selectedCity} nights={nights} />
                <label>
                    Notes:
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose}>
                    Close
                </button>
            </form>
        </div>
    );
};

export default EditTravelPlan;
