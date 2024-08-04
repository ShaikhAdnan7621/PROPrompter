"use client"
import React, { useState, useRef } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import promptTypes from '@/utils/json/promptTypes';
import PromptTypeInput from './PromptTypeSelect';
import ReactMDView from './ReactMDView';

const PromptCard = ({ prompt, Updateprompt, deletePromptbyid }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPromptData, setEditedPromptData] = useState({
    ...prompt
  });
  const tooltipRef = useRef(null); // Ref for the tooltip element

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Call Updateprompt to handle saving the edited data
    await Updateprompt(prompt._id, editedPromptData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedPromptData({
      ...prompt
    });
  };

  const handlePromptChange = (event) => {
    setEditedPromptData({ ...editedPromptData, prompt: event.target.value });
  };

  const handleTitleChange = (event) => {
    setEditedPromptData({ ...editedPromptData, prompttitle: event.target.value });
  };

  const handleTypeChange = (event) => {
    setEditedPromptData({ ...editedPromptData, prompttype: event.target.value });
  };

  const handlePublicChange = async () => {
    const updatedData = { ...editedPromptData, isPublic: !editedPromptData.isPublic };
    await Updateprompt(prompt._id, updatedData);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(editedPromptData.prompt || prompt.prompt);
      tooltipRef.current.style.opacity = 1;
      setTimeout(() => {
        tooltipRef.current.style.opacity = 0;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <div className={"bg-white rounded-2xl overflow-hidden shadow-md shadow-black/30 mb-4 "}>
      <div className=' px-2 pt-4 flex justify-between items-center '>
        {isEditing ? (
          <div className="sm:flex-row flex flex-col gap-2 w-full h-full">
            <input
              type="text"
              className="w-full rounded-xl shadow-md shadow-black/30 border p-2 focus:outline-none focus:none bg-white hover:bg-green-100 transition-all duration-50"
              value={editedPromptData.prompttitle}
              onChange={handleTitleChange}
            />
            <PromptTypeInput
              value={editedPromptData.prompttype}
              onChange={handleTypeChange}
              options={promptTypes}
            />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-green-700 px-1 ">{prompt.prompttitle}</h3>
            <p className=" text-green-600 mr-3 uppercase">{prompt.prompttype}</p> {/* Display the prompt type */}
          </>
        )}
      </div>
      <hr className='mt-2 mb-3 border-green-300' />
      <div className=' px-2 pt-1.5 bg-white '>
        {isEditing ? (
          <textarea
            className="w-full rounded-xl shadow-md shadow-black/30 border bg-white p-1 pb-0 resize-none focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 h-96 moderscroller"
            value={editedPromptData.prompt}
            onChange={handlePromptChange}
          />
        ) : (
          <ReactMDView prompt={prompt.prompt} />
        )}
      </div>
      <hr className='mt-2 mb-2 border-green-300' />
      <div className='flex gap-3 justify-end items-center px-5 py-1 bg-white'>
        {isEditing ? (
          <>
            <FaSave className='text-green-500 text-lg cursor-pointer mr-2' onClick={handleSaveClick} />
            <FaTimes className='text-green-500 text-lg cursor-pointer mr-2' onClick={handleCancelClick} />
          </>
        ) : (
          <>
            <div className='flex gap-2 items-center'>
              {prompt.isPublic ? (

                <span className='text-green-500 mr-2 flex items-center gap-2'>
                  <span>Public</span>
                  <FaEye className='text-green-500 text-lg cursor-pointer' onClick={handlePublicChange} />
                </span>
              ) : (
                <div className='text-green-500 mr-2 flex items-center gap-2'>
                  <span>Privet</span>
                  <FaEyeSlash className='text-green-500 text-lg cursor-pointer' onClick={handlePublicChange} />
                </div>
              )}
            </div>
            <FaEdit className='text-green-500 text-lg cursor-pointer mr-2' onClick={handleEditClick} />
            <FaTrash className='text-green-500 text-lg cursor-pointer mr-2' onClick={() => {
              deletePromptbyid(prompt._id)
            }} />
            <button className=" font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={copyPrompt}>
              <FaCopy className='text-green-500 text-lg cursor-pointer' />
            </button>
            <div ref={tooltipRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-900 text-white px-3 py-1 rounded-md opacity-0 transition-opacity duration-500 ">
              Copied!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PromptCard;