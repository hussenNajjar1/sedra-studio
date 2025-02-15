
export default function Button({ text, onClick }) {
    return (
        <button
            type="submit"
            className={`w-[90%] mr-4  mt-6 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600`}  >
            {text}
        </button>
    );
}
