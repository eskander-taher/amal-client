import React from "react";

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full h-12 border border-gray-300 rounded-full bg-white px-4 pr-10 text-gray-900 appearance-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-colors"
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
