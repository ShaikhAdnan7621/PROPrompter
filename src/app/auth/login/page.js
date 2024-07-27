// app/auth/login/page.js

"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { userLoginSchema } from '@/schemas/userLoginSchema';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            setErrors({});
            // Zod validation on the client-side
            const validationResult = userLoginSchema.safeParse(
                formData);
            console.log(validationResult);
            if (!validationResult.success) {
                setErrors(validationResult.error.flatten().fieldErrors);
                return; // Stop execution if validation fails
            }
            // Submit the login request
            const response = await axios.post("/api/auth/login", formData);
            if (response.status === 200) {
                router.push("/");
            } else {
                // Handle other status codes (e.g., 400, 401)
                if (response.status === 400) {
                    setErrors({ general: response.data.message });
                }
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setErrors({ general: error.response.data.message });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className='m-2 p-1 bg-green-500 rounded-xl'>
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}> {/* Wrap the input fields in a form */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 focus:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <p className='text-center  mt-4'>
                        Don't have an account? <Link href="/auth/signup" className="text-green-500 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}