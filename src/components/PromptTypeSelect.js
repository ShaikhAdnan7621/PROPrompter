// components/PromptTypeInput.js

"use client"
import React from 'react';

const PromptTypeInput = ({ value, onChange, options, className }) => {
  return (
    <select
      className={`rounded-xl bg-white p-2 h-full focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 w-full uppercase ${className}`}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className='uppercase'>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default PromptTypeInput;