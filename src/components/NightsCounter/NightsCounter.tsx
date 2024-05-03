import React from "react";
import cities from "@/data/cities.json";

/**
 * Interface for NightsCounterProps
 * @interface
 * @property {string} selectedCity - The selected city for the travel plan
 * @property {number} nights - The number of nights for the travel plan
 */
interface NightsCounterProps {
    selectedCity: string;
    nights: number;
}

/**
 * NightsCounter component calculates and displays the cost per night and total cost for a selected city and number of nights.
 * @param props - The properties passed to the component
 * @returns A JSX element containing the cost per night and total cost for the selected city and number of nights
 */
export default function NightsCounter({ selectedCity, nights }: NightsCounterProps) {

    /**
     * Calculates the cost per night for the selected city
     * @returns The cost per night for the selected city
     */
    const nightCost = () => {
        const city = cities.find((city) => city.name === selectedCity);
        if (!city) return 0;
        return city.overnight_cost;
    };

    /**
     * Calculates the total cost for the selected city and number of nights
     * @returns The total cost for the selected city and number of nights
     */
    const calculateTotalCost = () => {
        const city = cities.find((city) => city.name === selectedCity);
        if (!city) return 0;
        const costPerNight = parseInt(city.overnight_cost.replace(" SEK", ""));
        return nights * costPerNight;
    };
    
    return (
        <div>
            <label>Number of nights: {nights}</label>
            <p>Cost per night: {nightCost()}</p>
            <p>Total cost: {calculateTotalCost()} SEK</p>
        </div>
    );
}
