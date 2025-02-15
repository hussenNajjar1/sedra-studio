import React from "react";

export default function SelectField({ register, name, options, label }) {
    return (
        <select
            {...register(name, { required: `${label || name} مطلوب` })}
            className="w-[90%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black my-2 m-4 focus:ring-blue-500"
        >
            <option value="">اختر</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
