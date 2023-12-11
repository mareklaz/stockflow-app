import React from "react";

export default function InputField({
  label,
  type,
  name,
  id,
  autoComplete,
  placeholder,
  register,
  required,
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        {label}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          {...register(name)}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          step={type === "number" ? 0.01 : null}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
