import React, {useEffect, useState} from 'react';
import { getTravelByEmail } from '@/database';

type TravelPlan = {
  user: {
    name: string;
    email: string;
  };
  city: string;
  activity: string[];
  nights: number;
  dateRange: {
    start: string;
    end: string;
  };
  notes: string;
};

const SearchTravelPlan: React.FC = () => {
  const [email, setEmail] = useState<string>(localStorage.getItem('email') || '');
  const [travelPlan, setTravelPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('email', email)
  }, [email]);
  
  const searchTravelPlanByEmail = async () => { 
    try {
      const data = await getTravelByEmail(email);
      setTravelPlan(data); // Update the travelPlan state variable with the fetched data
    } catch (error) {
      console.error('Error fetching travel plan:', error);
      setError('Error fetching travel plan'); // Update the error state variable with an error message
    }
  }

  const clearSearch = () => {
    setEmail('');
    setTravelPlan(null);
    setError(null);
    localStorage.removeItem('email');
  }

  useEffect(() => {
    if (email) {
      searchTravelPlanByEmail();
    }
  }, []);

return (
    <div className="w-3/4">
      <div className="thick-line lined thick text-center p-5 mx-auto w-3/4">
        <h3 className="h3travel mb-3">Search Travel Plan by Email</h3>
        <div className="thin-line lined thin p-2 text-left">
          <label>
            Email :
            <input  className="w=3/4" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
        </div>
  
        <button onClick={searchTravelPlanByEmail} className="lined thin p-2 m-3">Search</button>
        <button onClick={clearSearch} className="lined thin p-2 m-3">Clear Search</button>
      </div>


      <section className="w-3/4 mx-auto">
        {error && <p>{error}</p>}
        <h2 className="text-4xl text-center m-10">Search results</h2>
        {travelPlan && travelPlan.map((plan: TravelPlan, index: number) => (
            <div key={index} className="my-10 max-w-3/4">
              <h3 className="h3travel">Travel Plan {index + 1}</h3>
              <div className="flex gap-2"><h3 className="h3travel">Traveler :</h3>
                <p>{plan.user.name} </p>
              </div>
              <div className="flex gap-2">
                <h3 className="h3travel">City : </h3><p>{plan.city}</p>
              </div>
              <div className="flex gap-2">
                <h3 className="h3travel">Date :</h3>
                <p>
                  {new Date(plan.dateRange.start).toDateString()} -{" "}
                  {new Date(plan.dateRange.end).toDateString()}
                </p>
              </div>
              <div className="flex gap-2"><h3 className="h3travel whitespace-nowrap">Activities :</h3>
                <p className="overflow-auto break-words">{plan.activity.join(", ")}</p></div>
              <div className="flex gap-2"><h3 className="h3travel">Nights :</h3>
                <p>{plan.nights} nights</p></div>
              <div className="flex gap-2"><h3 className="h3travel whitespace-nowrap">Notes :</h3> <p className="overflow-auto break-words">{plan.notes || 'None'}</p>
              </div>
              <hr className="border-dotted-travel"/>
            </div>
        ))}
      </section>
    </div>
);
}
export default SearchTravelPlan;
