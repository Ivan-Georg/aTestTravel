//import { NextApiRequest, NextApiResponse } from 'next'
//import travelPlans from '../../data/travelPlans.json'; // Adjust the path as needed
//
//export default function handler(req:NextApiRequest, res:NextApiResponse){
//  console.log('Travel Plans:', travelPlans); // Log the travel plans
//
//  const { email } = req.query;
//
//  console.log('Email:', email); // Log the email
//
//const user = travelPlans.find((user) => String(user.email) === email);
//
//  console.log('User:', user); // Log the user
//
//  if (!user) {
//    return res.status(404).json({ error: 'User not found' });
//  }
//
//  // Return the travel plan data for the matched user
//  res.status(200).json(user.plannedTravels);
//}
