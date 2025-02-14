import Sidebar from "../components/Sidebar";
export const metadata = {
    title: "استديو سدرة - لوحة التحكم ",
    description: "استديو سدرة هو المكان المثالي لابتكار وتجربة الأفكار المبدعة في عالم التصميم والجرافيك.",
    keywords: "تصميم، جرافيك، استديو، أفكار إبداعية",
    openGraph: {
        title: "استديو سدرة - لوحة التحكم",
        description: "تصفح أفضل الأعمال الفنية والإبداعية في استديو سدرة.",
        images: ["https://www.sedra-studio.com/images/og-image.jpg"],
        url: "https://www.sedra-studio.com",
    },
    icons: {
        icon: "/images/png/img4.png",
    },
};
export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen " dir="rtl">
            <Sidebar />
            <div className="flex-1  bg-gray-100 overflow-x-auto  ">
                <main className="p-4 bg-[#0A1931] min-h-screen mr-14 md:mr-0">{children}</main>
            </div>
        </div>
    );
}
