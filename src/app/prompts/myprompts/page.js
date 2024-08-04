"use client"
import { useEffect, useState } from 'react';
import { FaPaperPlane, FaSquarePlus } from "react-icons/fa6";
import axios from 'axios';
import { PromptSchema } from '@/schemas/promptSchema';
import PromptCard from '@/components/PromptCard';
import PromptTypeInput from '@/components/PromptTypeSelect';
import promptTypes from '@/utils/json/promptTypes';
import ConfirmPopup from '@/components/ConfirmPopup'; // Import ConfirmPopup component
import Pagination from '@/components/Pagination'; // Import Pagination component

export default function Page() {
    const [promptText, setPromptText] = useState('');
    const [titleText, setTitleText] = useState('');
    const [selectedType, setSelectedType] = useState('General');
    const [promptList, setPromptList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [confirmPopup, setConfirmPopup] = useState({
        isOpen: false,
        title: '',
        message: '',
        function: () => { }
    });

    // useEffect(() => {
    //     fetchPrompts();
    // }, []); // Fetch initially

    // Update prompts when currentPage changes
    useEffect(() => {
            fetchPrompts();
    }, [currentPage]);  

    const fetchPrompts = async () => {
        try {
            const response = await axios.post('/api/prompt/get', { page: currentPage, limit: 10 }); // Send the current page number in the request
            if (response.status === 200) {
                console.log(response.data)
                setPromptList(response.data.prompts);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } else {
                console.error('Error fetching prompts:', response.data);
            }
        } catch (error) {
            console.error('Error fetching prompts:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const handlePromptChange = (event) => {
        setPromptText(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitleText(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const promptData = {
                prompt: promptText,
                prompttitle: titleText,
                prompttype: selectedType,
                isPublic: false,
            };

            const validationResult = PromptSchema.safeParse(promptData);

            if (validationResult.success) {
                const response = await axios.post('/api/prompt/create', { ...validationResult.data });
                if (response.status === 201) {
                    console.log("Prompt created successfully!");
                    setPromptText('');
                    setTitleText('');
                    setSelectedType('General');
                    fetchPrompts();
                } else {
                    console.error('Error creating prompt:', response.data);
                }

            } else {
                console.error('Validation errors:', validationResult.error.errors);
            }

        } catch (error) {
            console.error('Error submitting prompt:', error);
        }
    };

    const Updateprompt = async (id, updatedData) => {
        setConfirmPopup({
            isOpen: true,
            title: 'Confirm Update',
            message: 'Are you sure you want to update this prompt?',
            function: () => {
                // Update the prompt after confirmation
                updatePrompt(id, updatedData);
            }
        });
    };

    const updatePrompt = async (id, updatedData) => {
        try {
            const validationResult = PromptSchema.safeParse(updatedData);

            if (validationResult.success) {
                const response = await axios.put(`/api/prompt/update/`, { ...validationResult.data, _id: id });
                if (response.status === 200) {
                    console.log("Prompt updated successfully!");
                    fetchPrompts();
                    setConfirmPopup({ isOpen: false }); // Close the popup after update
                } else {
                    console.error('Error updating prompt:', response.data);
                }
            } else {
                console.error('Validation errors:', validationResult.error.errors);
            }
        } catch (error) {
            console.error('Error updating prompt:', error);
        }
    }

    const deletePrompt = async (id) => {
        setConfirmPopup({
            isOpen: true,
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this prompt?',
            function: () => {
                deletePromptbyid(id);
            }
        });
    };

    const deletePromptbyid = async (id) => {
        try {
            const response = await axios.delete(`/api/prompt/delete/`, { data: { _id: id } });
            if (response.status === 200) {
                console.log("Prompt deleted successfully!");
                fetchPrompts();
                setConfirmPopup({ isOpen: false }); // Close the popup after delete
            } else {
                console.error('Error deleting prompt:', response.data);
            }
        } catch (error) {
            console.error('Error deleting prompt:', error);
        }
    }

    const handlePlusClick = () => {

        const textarea = document.querySelector('textarea');
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;

        setPromptText(
            promptText.substring(0, selectionStart) +
            '[]' +
            promptText.substring(selectionEnd)
        );
        textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center min-h-screen bg-green-100 relative">
            <div className='max-w-[1280px] mx-auto w-full'>
                <div className="fixed bottom-0 animate-div w-full max-w-[1280px] p-4">
                    <div className=" rounded-2xl shadow-[0_8px_15px_5px_#14532d30] bg-green-700 p-1 ">
                        <div className='flex items-center w-full ' >
                            <div className='w-full flex flex-col gap-1'
                                onKeyDown={(e) => {
                                    if (e.ctrlKey && e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                            >
                                <div className='flex gap-1  sm:flex-row flex-col'>
                                    <div className='sm:w-1/2 wfull flex gap-1 '>
                                        <input
                                            type="text"
                                            className="grow w-full rounded-xl shadow-md shadow-black/30 border p-2 focus:outline-none focus:none bg-white hover:bg-green-100 transition-all duration-50 moderscroller"
                                            placeholder="Enter prompt title..."
                                            value={titleText}
                                            onChange={handleTitleChange}
                                        />
                                        <div className="min-w-8 w-12 flex items-center shadow-md shadow-black/30 justify-center rounded-xl -rounded-full border bg-white p-2 resize-none focus:outline-none focus:none hover:bg-green-100 transition-all duration-50"
                                            onClick={handlePlusClick}
                                        >
                                            <FaSquarePlus className='text-2xl text-green-700 w-full active:scale-125 duration-200 active:bottom-2 active:right-2'
                                            />
                                        </div>
                                    </div>
                                    <div className='sm:w-1/2 wfull flex gap-1'>
                                        <div className=' grow'>
                                            <PromptTypeInput
                                                value={selectedType}
                                                onChange={handleTypeChange}
                                                options={promptTypes}
                                            /></div>
                                        <div className=" w-12 flex items-center shadow-md shadow-black/30 justify-center rounded-xl -rounded-full border bg-white p-2 resize-none focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 relative">
                                            <FaPaperPlane
                                                className='text-2xl text-green-700 w-full active:scale-125 duration-200 active:bottom-2 active:right-2'
                                                onClick={handleSubmit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    className="h-20 w-full rounded-xl shadow-md shadow-black/30 border bg-white p-2 resize-none focus:outline-none focus:none hover:bg-green-100 transition-all duration-50"
                                    placeholder="Enter your prompt here..."
                                    value={promptText}
                                    onChange={handlePromptChange}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                <div className=" max-w-[1280px] p-2 pt-14 w-full h-screen">
                    <div className="overflow-x-scroll p-2 pt-0 moderscroller sm:pb-36 w-full pb-48 h-full">
                        {promptList.map((prompt) => (
                            <PromptCard key={prompt._id} prompt={prompt}
                                Updateprompt={Updateprompt}
                                deletePromptbyid={deletePrompt}
                            />
                        ))}
                        {promptList.length > 0 &&
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        }
                    </div>
                </div>
            </div>
            {/* Render the ConfirmPopup component */}
            <ConfirmPopup
                isOpen={confirmPopup.isOpen}
                title={confirmPopup.title}
                message={confirmPopup.message}
                onConfirm={confirmPopup.function}
                onClose={() => setConfirmPopup({ isOpen: false })}
            />
        </div>
    );
};