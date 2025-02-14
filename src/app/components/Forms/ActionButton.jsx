// components/ActionButton.jsx
import Link from "next/link";
import { cairo100 } from "../../../../fonts";
export default function ActionButton({ href, label }) {
    return (
        <Link href={href}>
            <button className={`w-auto p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600  ${cairo100.className} `}>
                {label}
            </button>
        </Link>
    );
}
