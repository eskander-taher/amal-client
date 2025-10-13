import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full h-12 border border-gray-300 rounded-full bg-white px-4 text-gray-900 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-colors"
      />
    </div>
  );
};

export default TextInput;
