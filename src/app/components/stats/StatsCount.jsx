"use client";
import { cairo100 } from "../../../../fonts";
import { MdOutlineLocalOffer, MdMessage } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrArticle } from "react-icons/gr";
import { BiSolidTrafficCone } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StatsCountPage() {
    const [stats, setStats] = useState({
        articleCount: 0,
        contactCount: 0,
        offersCount: 0,
        userCount: 0,
        visitorCount: 0,
    });

    const fetchStats = async () => {
        try {
            const response = await axios.get("/api/stats", {
                headers: { 'Cache-Control': 'no-cache' }
            });

            if (response.data?.data) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchStats(); // جلب البيانات عند تحميل الصفحة
        const interval = setInterval(fetchStats, 5000); // تحديث كل 5 ثوانٍ

        return () => clearInterval(interval);
    }, []);

    const statsData = [
        { title: "عدد المقالات", count: stats.articleCount, color: "bg-blue-500", Icon: GrArticle },
        { title: "عدد الرسائل", count: stats.contactCount, color: "bg-green-500", Icon: MdMessage },
        { title: "عدد العروض", count: stats.offersCount, color: "bg-yellow-500", Icon: MdOutlineLocalOffer },
        { title: "عدد المستخدمين", count: stats.userCount, color: "bg-red-500", Icon: FiUsers },
        { title: "عدد الزوار", count: stats.visitorCount, color: "bg-purple-500", Icon: BiSolidTrafficCone },
    ];

    return (
        <div className="p-6">
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map(({ title, count, color, Icon }, index) => (
                        <DashboardCard key={index} title={title} count={count} color={color} Icon={Icon} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, count, color, Icon }) {
    return (
        <div className={`${color} text-white p-6 rounded-lg shadow flex items-center gap-4`}>
            <Icon size={40} className="text-white" />
            <div>
                <h3 className={`text-lg font-bold ${cairo100.className}`}>{title}</h3>
                <p className="text-4xl font-bold mt-2">{count}</p>
            </div>
        </div>
    );
}
