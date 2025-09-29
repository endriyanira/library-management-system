import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

/**
 * Global Input Component for forms, styled with Tailwind CSS.
 *
 * @param {string} label - The text displayed above the input.
 * @param {string} type - The input type (e.g., 'text', 'email', 'password').
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - The handler function for value changes.
 * @param {boolean} required - HTML required attribute.
 */

const InputForm = ({
  label,
  type,
  value,
  onChange,
  required = false,
  showToggle = false,
}) => {
  const [inputType, setInputType] = useState(type);

  const toogleVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={showToggle ? inputType : type}
        value={value}
        onChange={onChange}
        required={required}
        // Tailwind classes for consistent styling
        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                   transition duration-150 ease-in-out"
      />
      {showToggle && (
        <button
          type="button"
          onClick={toogleVisibility}
          className="absolute bottom-3.5 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-indigo-600"
          aria-label={
            inputType === "password" ? "Show password" : "Hide password"
          }
        >
          {inputType === "password" ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
      )}
    </div>
  );
};

export default InputForm;
