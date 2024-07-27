// app/auth/logout/page.js

'use client'; 

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutPage() {
    const router = useRouter();

    async function handleLogout() {
        try {
            const response = await axios.post('/api/auth/logout'); // Replace with your actual logout endpoint
            console.log('Logout successful:', response.data);
            router.push('/auth/login');


        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                console.error('Network error during logout:', error);
                // Handle the network error (e.g., display an error message to the user)
            } else {
                console.error('Logout error:', error);
                // Handle other potential errors
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className='m-2 p-1 bg-green-500 rounded-xl'>
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
                        Logout
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Are you sure you want to logout?
                    </p>
                    <div className="flex justify-center">
                        <button
                            className="bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                            onClick={handleLogout}
                        >
                            logout
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => router.push('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}