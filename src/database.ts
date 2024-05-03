import { openDB, DBSchema, IDBPDatabase } from "idb";

interface User {
    name: string;
    email: string;
}

interface Travel {
    id?: number;
    user: User;
    city: string;
    dateRange: { start: Date; end: Date };
    activity: string[];
    nights: number;
    notes: string;
}

interface TravelDB extends DBSchema {
    travels: {
        key: number;
        value: Travel;
    };
}

async function createDatabase(): Promise<IDBPDatabase<TravelDB>> {
    return openDB<TravelDB>("travelDatabase", 1, {
        upgrade(db) {
            db.createObjectStore("travels", {
                keyPath: "id",
                autoIncrement: true,
            });
        },
    });
}

async function addTravel(travel: Travel): Promise<number> {
    const db = await createDatabase();
    return db.add("travels", travel);
}

async function getAllTravels(): Promise<Travel[]> {
    const db = await createDatabase();
    return db.getAll("travels");
}

async function deleteTravel(id: number): Promise<void> {
    const db = await createDatabase();
    return db.delete("travels", id);
}

async function getTravelById(id: number): Promise<Travel | undefined> {
    const db = await createDatabase();
    return db.get("travels", id);
}

async function updateTravel(travel: Travel): Promise<void> {
    const db = await createDatabase();
    await db.put("travels", travel);
}

async function populateDatabase(travelPlans: Travel[]): Promise<void> {
    if (!localStorage.getItem("databasePopulated")) {
        const db = await createDatabase();
        const tx = db.transaction("travels", "readwrite");
        travelPlans.forEach((plan) => tx.store.add(plan));
        await tx.done;
        localStorage.setItem("databasePopulated", "true");
    }
}

async function getTravelByEmail(email: string): Promise<Travel[]> {
    const db = await createDatabase();
    const allTravels = await db.getAll("travels");
    return allTravels.filter((travel) => travel.user && travel.user.email === email);
}

export {
    addTravel,
    getAllTravels,
    deleteTravel,
    populateDatabase,
    getTravelByEmail,
    updateTravel,
    getTravelById,
};
