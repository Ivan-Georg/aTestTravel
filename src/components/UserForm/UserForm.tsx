import React from 'react';
import { useCookies } from 'react-cookie';

interface UserFormProps{
    onUserSubmit: (user:{name: string, email: string}) => void;
}

export default function UserForm({onUserSubmit}: UserFormProps) {
    const [_, setCookie] = useCookies(['user'])
    
    const handleUserFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const name = (event.target as any)['name'].value;
        const email = (event.target as any)['email'].value;
        setCookie('user', { name, email }, { path: '/' });
        onUserSubmit({name, email});
    }

    return (
        <form onSubmit={handleUserFormSubmit} className="flex flex-col justify-center items-end text-xl">
            <label>
                Name :
                <input type="text" name="name" required className="lined thin ml-4 mb-2 p-1" />
            </label>
            <label>
                Email :
                <input type="email" name="email" required className="lined thin ml-4 mb-2 p-1"  />
            </label>
            <button type="submit" className="lined thin p-2 mt-3">Submit</button>
        </form>
    );
}