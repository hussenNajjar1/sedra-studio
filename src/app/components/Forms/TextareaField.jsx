export default function TextareaField({ type, placeholder, register, name, validation }) {
    return (
        <div className="w-full">
            <textarea
                type={type}
                {...register(name, validation)}
                placeholder={placeholder}
                rows={10}
                cols={10}
                className="w-[90%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black my-2 m-4 focus:ring-blue-500"
            />
        </div>
    );
}