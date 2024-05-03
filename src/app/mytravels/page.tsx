"use client";

import React, {useEffect, useState} from "react";
import UserForm from "@/components/UserForm/UserForm";
import ListMyTravels from "@/components/ListMyTravels/ListMyTravels";
import { useUserCookie } from "@/hooks/useUserCookie"

export default function MyTravels() {
    const isUserCookiePresent = useUserCookie();
    const [showUserForm, setShowUserForm] = useState(true);

    useEffect(() => {
        setShowUserForm(!isUserCookiePresent)
    }, [isUserCookiePresent]);
    
    const handleUserSubmit = (user: { name: string; email: string }) => {
        setShowUserForm(false);
    };

    return showUserForm ? <UserForm onUserSubmit={handleUserSubmit} /> : <ListMyTravels />;
}
