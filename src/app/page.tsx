'use client';

import React, {useEffect, useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { populateDatabase } from '@/database';
import travelPlans from '@/data/travelPlans.json';
import 'tailwindcss/tailwind.css';
import UserForm from "@/components/UserForm/UserForm";
import {useCookies} from "react-cookie";

export default function Home() {
  // Transform the data to match the Travel type
  const transformedTravelPlans = travelPlans.map(plan => ({
    ...plan,
    user: {
      name: plan.user ? plan.user : '',
      email: plan.email ? plan.email : '',
    },
    dateRange: {
      start: new Date(plan.dateRange.start),
      end: new Date(plan.dateRange.end),
    },
  }));

  // Call the function when the component is first rendered
  useEffect(() => {
    populateDatabase(transformedTravelPlans);
  }, []);

  const [showUserForm, setShowUserForm] = useState(true);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    setShowUserForm(!cookies.user);
  }, []);

  const handleUserSubmit = (user: { name: string; email: string }) => {
    setShowUserForm(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl text-center p-3 mb-5">Welcome to Lagom Travel</h2>
    
      <UserForm onUserSubmit={handleUserSubmit} />
      
    </div>
  );
}