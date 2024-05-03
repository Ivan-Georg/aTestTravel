"use client";

import styles from "./page.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import NightsCounter from "@/components/NightsCounter/NightsCounter";
import CityList from "@/components/CityList/CityList";
import ActivityList from "@/components/ActivityList/ActivityList";
import { addTravel } from "@/database";
import Modal from "@/components/Modal/Modal";
import UserForm from "@/components/UserForm/UserForm";

export default function PlanTravels() {
    // cookie
    const [cookies, setCookie] = useCookies(["user"]);
    const [showUserForm, setShowUserForm] = useState(true);

    // Updates state on client after mount
    useEffect(() => {
        setShowUserForm(!cookies.user);
    }, [cookies.user]);

    // useStates
    const [selectedCity, setSelectedCity] = useState("Stockholm");
    const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [nights, setNights] = useState(0);
    const [notes, setNotes] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handles show form if user is not present
    const handleUserSubmit = (user: { name: string; email: string }) => {
        setShowUserForm(false);
    };

    // Handles city selection
    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(() => event.target.value);
        setDateRange(() => ({ start: new Date(), end: new Date() }));
        setSelectedActivities(() => []);
        setNights(() => 0);
        setNotes(() => "");
        setIsSaved(() => false);
    };

    const handleDateRangeChange = useCallback((range: { start: Date; end: Date }) => {
        setDateRange(range);
        if (range.start && range.end) {
            const diffInTime = range.end.getTime() - range.start.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);
            const nights = Math.ceil(diffInDays);
            setNights(nights);
        }
    }, []);

    const handleNightsChange = (nights: number) => {
        setNights(nights);
    };

    // Handels activity selection
    const handleActivitiesChange = (activity: string, checked: boolean) => {
        if (checked) {
            setSelectedActivities((prevActivities) => [...prevActivities, activity]);
        } else {
            setSelectedActivities((prevActivities) => prevActivities.filter((a) => a !== activity));
        }
    };

    // Handles nots change
    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };

    // Handle submit to DB on save
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const travelPlan = {
            user: cookies.user,
            city: selectedCity,
            activity: selectedActivities,
            nights,
            dateRange,
            notes,
        };

        addTravel(travelPlan)
            .then((id) => {
                setIsSaved(true);
                setSaveMessage(`Travel plan saved! Your travel ID is ${id}.`);
                setTimeout(() => {
                    setIsSaved(false);
                    setIsModalOpen(false);
                    setSaveMessage("");
                }, 3000);
            })
            .catch((error) => {
                console.error("Failed to save the travel plan:", error);
            });
    };

    return (
        <div>
            <Modal isOpen={isModalOpen}>
                <div className="text-center">
                    <h2 className="text-4xl mb-3">Travel plan saved!</h2>
                    <button
                        className="lined thin p-2"
                        onClick={() => {
                            setIsModalOpen(false);
                            setIsSaved(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </Modal>
            {showUserForm ? (
                <UserForm onUserSubmit={handleUserSubmit} />
            ) : (
                <div className="mt-3 text-center">
                    <h2 className="text-4xl mb-4">Plan your Travel</h2>
                    {saveMessage && <p>{saveMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-xl mb-2">
                            Where are you going{" "}
                            {cookies.user && cookies.user.name ? cookies.user.name : ""}?
                        </h3>
                        <div className="thin-line lined thin">
                            <CityList handleCityChange={handleCityChange} selectedCity={""} />
                        </div>

                        <hr className="border-dotted-travel" />

                        <h3 className="text-xl mb-2">When will you be there?</h3>
                        <DateRangePicker
                            key={`datePicker-${selectedCity}`}
                            handleDateRangeChange={handleDateRangeChange}
                            handleNightsChange={handleNightsChange}
                        />

                        <div className="mt-4 text-l">
                            <NightsCounter
                                key={`nightsCounter-${selectedCity}`}
                                selectedCity={selectedCity}
                                nights={nights}
                            />
                        </div>

                        <hr className="border-dotted-travel" />

                        <h3 className="text-xl mb-2">What activity are you going to do?</h3>
                        <ActivityList
                            key={`activityList-${selectedCity}`}
                            selectedCity={selectedCity}
                            handleActivitiesChange={handleActivitiesChange}
                        />

                        <hr className="border-dotted-travel" />

                        <h3 className="text-xl mb-2">Notes for your trip.</h3>
                        <textarea
                            key={selectedCity}
                            onChange={handleNotesChange}
                            className="thin-line lined thin min-w-72 min-h-48 p-3"
                        ></textarea>
                        <br />
                        <button type="submit" className="lined thin p-2 mb-10">
                            {isSaved ? "Saved" : "Save"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
