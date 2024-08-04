"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEye, FaCopy, FaSearch } from "react-icons/fa";
import promptTypes from '@/utils/json/promptTypes';
import Pagination from '@/components/Pagination';
import PromptTypeInput from '@/components/PromptTypeSelect';
import ReactMDView from '@/components/ReactMDView';

export default function Page() {
    const [publicPrompts, setPublicPrompts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const tooltipRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [showDefaultPrompts, setShowDefaultPromptsPrompts] = useState(true);
    const fetchPublicPrompts = async () => {
        try {
            const params = {
                search: searchQuery,
                type: selectedType,
                page: currentPage,
                default: showDefaultPrompts
            }
            console.log(params)

            const response = await axios.put('/api/prompt/get/public', params);

            if (response.status === 200) {
                setPublicPrompts(response.data.prompts);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                console.log(response.data);
            } else {
                console.error('Error fetching public prompts:', response.data);
            }
        } catch (error) {
            console.error('Error fetching public prompts:', error);
        }
    };

    useEffect(() => {
        fetchPublicPrompts();
    }, [currentPage]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const copyPrompt = async (promptText) => {
        try {
            await navigator.clipboard.writeText(promptText);
            tooltipRef.current.style.opacity = 1;
            setTimeout(() => {
                tooltipRef.current.style.opacity = 0;
            }, 2000);
        } catch (error) {
            console.error("Failed to copy prompt:", error);
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setShowDefaultPromptsPrompts(false);
        fetchPublicPrompts();
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center min-h-screen bg-green-100 relative">
            <div className='p-1 pt-14 sm:p-4 sm:pt-14 max-w-[1280px] mx-auto w-full h-full flex flex-col '>
                <div className="rounded-2xl shadow-md shadow-black/30  bg-green-700 p-1  mb-4">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-1 w-full">
                        <div className=' w-full sm:w-1/2 '>
                            <input
                                type="text"
                                className="rounded-xl bg-white p-2 h-full focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 w-full"
                                placeholder="Search prompts..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className=' w-full sm:w-1/2'>
                            <PromptTypeInput
                                value={selectedType}
                                onChange={handleTypeChange}
                                options={[{ "value": "All", "label": "All" }, ...promptTypes]}
                            />
                        </div>
                        <button type="submit" className="rounded-xl bg-white focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/40 font-bold py-2 px-4 focus:shadow-outline text-center"
                        >
                            <FaSearch className="text-lg text-center mx-auto" />
                        </button>
                    </form>
                </div>
                <div className=" max-w-[1280px] p-4 overflow-auto moderscroller h-screen w-full">
                    {publicPrompts.map((prompt) => (
                        <div key={prompt._id} className={"bg-white rounded-2xl overflow-hidden shadow-md shadow-black/30 mb-4 "}>
                            <div className=' px-2 py-3 flex justify-between items-center '>
                                <h3 className="text-xl font-bold text-green-700 px-1 ">{prompt.prompttitle}</h3>
                                <p className=" text-green-600 mr-3">{prompt.prompttype}</p>
                            </div>
                            <hr className=' mb-2 border-green-300' />

                            <div className=' px-2 pt-1.5 bg-white '>
                                <div className=' px-2 pt-1.5 bg-white '>
                                    <ReactMDView prompt={prompt.prompt} />
                                </div>
                            </div>
                            <hr className='mt-2 border-green-300' />
                            <div className='flex gap-2 justify-end px-5 py-2 '>
                                <div className='flex gap-2 items-center '>
                                    <span className='text-green-500'>Public: </span>
                                    <FaEye className='text-green-500 text-lg cursor-pointer' />
                                </div>
                                <button className=" text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => copyPrompt(prompt.prompt)}>
                                    <FaCopy className='text-green-500 text-lg cursor-pointer' />
                                </button>
                                <div ref={tooltipRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-900 text-white px-3 py-1 rounded-md opacity-0 transition-opacity duration-500 ">
                                    Copied!
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}