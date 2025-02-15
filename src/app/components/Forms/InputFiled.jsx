// components/Input.jsx
export default function InputFiled({ type, placeholder,register ,name}) {
    return (
        <input
            type={type}
            {...register(name, { required: `${name} is required` })}
            placeholder={placeholder}
            className="w-[90%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black my-2 m-4 focus:ring-blue-500"
        />
    );
}
