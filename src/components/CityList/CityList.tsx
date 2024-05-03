import React from "react";
import cities from "@/data/cities.json";

interface CityListProps {
    selectedCity: string;
    handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CityList: React.FC<CityListProps> = ({ selectedCity, handleCityChange }) => {
    return (
        <select value={selectedCity} onChange={handleCityChange}>
            {cities.map((city, index) => (
                <option key={index} value={city.name}>
                    {city.name}
                </option>
            ))}
        </select>
    );
};

export default CityList;
