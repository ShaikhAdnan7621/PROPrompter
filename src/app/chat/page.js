// app/prompts/myprompts/page.js

"use client"

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEye, FaCopy, FaSearch } from "react-icons/fa";
import promptTypes from '@/utils/json/promptTypes';
import Pagination from '@/components/Pagination';
import PromptTypeInput from '@/components/PromptTypeSelect';
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import ChatWindow from '@/components/ChatWindow';
import ReactMDView from '@/components/ReactMDView';

export default function Page() {
    const [sidepar, setSidepar] = useState(false);
    const [publicPrompts, setPublicPrompts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const tooltipRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [showDefaultPrompts, setShowDefaultPromptsPrompts] = useState(true);

    useEffect(() => {
        fetchPublicPrompts();
    }, [currentPage]);

    const fetchPublicPrompts = async () => {
        try {
            const params = {
                search: searchQuery,
                type: selectedType,
                page: currentPage,
                default: showDefaultPrompts
            }


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
            <div className='max-w-[1280px] mx-auto w-full  h-full relative overflow-auto p-3 pt-12'>
                <div className="h-full w-full shadow-lg rounded-3xl bg-green-300">
                    <ChatWindow />
                </div>
                {/* sidebar */}
                <div className=" absolute top-0 left-0 h-full w-80 sm:w-96 shadow-lg rounded-xl pt-12 "
                    style={{
                        transform: sidepar ? 'translateX(0)' : 'translateX(-100%)'
                    }}
                >
                    <div id="sidebar" className=" relative w-full h-full bg-green-100">
                        <button
                            onClick={() => { setSidepar(!sidepar) }}
                            className=" absolute top-full transform -translate-y-40 left-full rounded-l-md rounded-r-3xl  py-5 px-1 bg-green-700 focus:outline-none  " >

                            {sidepar ? <BsArrowBarLeft className='text-white text-xl' /> : <BsArrowBarRight className='text-white text-xl' />}
                        </button>
                        <div className="p-1 pb-2 mx-auto w-full h-full flex flex-col">
                            <div className=" rounded-2xl shadow-[0_8px_15px_5px_#14532d30] bg-green-700 p-1.5 mb-4">
                                <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2 w-full">
                                    <div className=' w-full '>
                                        <input
                                            type="text"
                                            className="rounded-xl bg-white p-2 h-full focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 w-full"
                                            placeholder="Search prompts..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <div className=' w-full'>
                                        <PromptTypeInput
                                            value={selectedType}
                                            onChange={handleTypeChange}
                                            options={[{ "value": "All", "label": "All" }, ...promptTypes]}
                                        />
                                    </div>
                                    <button type="submit" className="rounded-xl bg-white focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 font-bold py-2 px-4 focus:shadow-outline text-center"
                                    >
                                        <FaSearch className="text-lg mx-auto text-center" />
                                    </button>
                                </form>
                            </div>
                            <div className=" max-w-[1280px] p-1 overflow-auto moderscroller h-screen w-full">
                                {publicPrompts.map((prompt) => (
                                    <div key={prompt._id} className={"bg-white rounded-xl overflow-hidden shadow-md shadow-black/30 mb-4 pb-2 relative group"}>
                                        <div className=' px-2 py-1.5 flex justify-between items-center '>
                                            <h3 className="text-md font-bold text-green-700 px-0.5 ">{prompt.prompttitle}</h3>
                                            <p className=" text-green-500 mr-3 uppercase">{prompt.prompttype}</p>
                                        </div>
                                        <hr className='border-green-300' />

                                        <div className=' px-2 pt-1.5 bg-white'>
                                            <ReactMDView prompt={prompt.prompt} />
                                        </div>
                                        <div className=' gap-2 justify-end px-5 group-hover:flex hidden' >
                                            <button className=" text-white font-bold  rounded focus:outline-none focus:shadow-outline"
                                                onClick={() => copyPrompt(prompt.prompt)}>
                                                <FaCopy className='text-green-500 text-lg cursor-pointer' />
                                            </button>
                                        </div>
                                        <div ref={tooltipRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-900 text-white px-3 py-1 rounded-md opacity-0 transition-opacity duration-500 ">
                                            Copied!
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
                </div>
            </div>
        </div>
    );
}