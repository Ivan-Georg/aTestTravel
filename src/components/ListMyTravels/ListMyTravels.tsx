import React from "react";
import { useCookies } from "react-cookie";
import { getAllTravels } from "@/database";
import DeleteMyTravels from "../DeleteMyTravels/DeleteMyTravels";
import EditMyTravels from "../EditMyTravels/EditMyTravels";
import UserForm from "../UserForm/UserForm";
import { useState } from "react";

export default function ListMyTravels() {
    // cookie
    const [cookies, setCookie] = useCookies(["user"]);

    // useStates
    const [travels, setTravels] = React.useState<any[]>([]);
    const [deleteMessage, setShowDeleteMessage] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTravelId, setSelectedTravelId] = useState<number | null>(null);

    React.useEffect(() => {
        if (cookies.user) {
            getAllTravels().then((allTravels) => {
                const userTravels = allTravels.filter(
                    (travel) => travel.user?.email === cookies.user.email
                );
                setTravels(userTravels);
            });
        }
    }, [cookies.user]);

    const handleDelete = (id: number) => {
        setTravels(travels.filter((travel) => travel.id !== id));
        setShowDeleteMessage("Travel Deleted");
        setTimeout(() => {
            setShowDeleteMessage("");
        }, 3000);
    };

    const handleEdit = (id: number) => {
        console.log("Editing travel with ID:", id);
        setSelectedTravelId(id);
        setShowEditModal(true);
    };

    const handleUserSubmit = (user: { name: string; email: string }) => {
        setCookie("user", user, { path: "/" });
    };

    return (
        <div className="w-3/4">
            <h2 className="text-4xl text-center m-5">My Planned Travels</h2>

            <hr className="border-dotted-travel" />

            {!cookies.user ? (
                <UserForm onUserSubmit={handleUserSubmit} />
            ) : (
                <section className="w-3/4 mx-auto">
                    <h3>{deleteMessage}</h3>

                    <ul>
                        {travels.map((travel) => (
                            <li key={travel.id}>
                                <div className="flex gap-2">
                                    <h3 className="h3travel">Traveler :</h3>
                                    <p>{travel.user.name} </p>
                                </div>
                                <div className="flex gap-2">
                                    <h3 className="h3travel">Email :</h3>
                                    <p>{travel.user.email}</p>
                                </div>

                                <h3 className="h3travel">Going to {travel.city}</h3>
                                <div className="flex gap-2">
                                    <h3 className="h3travel">Date :</h3>
                                    <p>
                                        {travel.dateRange.start.toDateString()} -{" "}
                                        {travel.dateRange.end.toDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <h3 className="h3travel whitespace-nowrap">Activities :</h3>
                                    <p className="overflow-auto break-words">
                                        {travel.activity.join(", ")}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <h3 className="h3travel">Nights :</h3>
                                    <p>{travel.nights} nights</p>
                                </div>
                                <div className="flex gap-2">
                                    <h3 className="h3travel whitespace-nowrap">Notes :</h3>{" "}
                                    <p className="overflow-auto break-words">{travel.notes}</p>
                                </div>
                                <button onClick={() => handleEdit(travel.id)}>Edit</button>
                                <DeleteMyTravels id={travel.id} onDelete={handleDelete} />
                                <hr className="border-dotted-travel" />
                            </li>
                        ))}
                    </ul>
                    {showEditModal && selectedTravelId !== null && (
                        <EditMyTravels
                            travelId={selectedTravelId}
                            onClose={() => setShowEditModal(false)}
                        />
                    )}
                </section>
            )}
        </div>
    );
}
