// app/auth/signup/page.js

"use client"
import { useState } from 'react';
import axios from 'axios';
import { userSignupSchema } from '@/schemas/userSignupSchema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({}); // Clear any previous errors

        try {
            const validationResult = userSignupSchema.safeParse(formData);
            if (!validationResult.success) {
                setErrors(validationResult.error.flatten().fieldErrors);
                setIsLoading(false);
                return;
            }

            const response = await axios.post('/api/auth/register', formData);

            if (response.status === 200) {
                console.log('User created successfully!');
                router.push('/auth/login');
            } else {
                console.error('Error creating user:', response.status);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // check the all fields and try again 
            if (error.response) {
                if (error.response.data.message == "user already exists") {
                    setErrors({ general: "user already exists" })
                }
            } else { setErrors({ general: "check all fields and try again" }) }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className='m-2 p-1 bg-green-500 rounded-xl'>
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
                        Sign Up
                    </h1>

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

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    {
                        errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>
                    }
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 focus:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <p className="text-center mt-4">
                        Already have an account? <Link href="/auth/login" className="text-green-500 hover:underline mt-2">Login</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
