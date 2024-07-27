// components/ConfirmPopup.js

"use client"
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const ConfirmPopup = ({ isOpen, title, message, onConfirm, onClose }) => {

    if (!isOpen) {
        return null;
    }

    const handleConfirm = async () => {
        try {
            await onConfirm(); // Call the confirmation function
        } catch (error) {
            console.error('Error during confirmation:', error);
        } finally {
            onClose(); // Close the popup after confirmation
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-2">
            <div className="bg-white rounded-lg p-8 shadow-xl sm:w-96 w-80 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-green-700">{title}</h2>
                <p className="mb-6 text-gray-600">{message}</p>
                <div className="flex justify-around flex-wrap gap-4">
                    <button
                        className=" bg-red-500 hover:bg-red-700  text-gray-100 font-bold py-2 px-4 rounded-full"
                        onClick={onClose}
                    >
                        <FaTimesCircle className="inline-block mr-2" />
                        Cancel
                    </button>
                    <button
                        className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full `}
                        onClick={handleConfirm}
                    >

                        <FaCheckCircle className="inline-block mr-2" />

                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;