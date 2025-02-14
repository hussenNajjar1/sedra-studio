"use client";

import { cairo100 } from "../../../fonts";
import { MdOutlineLocalOffer, MdMessage } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrArticle } from "react-icons/gr";
import { BiSolidTrafficCone } from "react-icons/bi"; // ✅ أيقونة الزوار
import { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardPage() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log("Starting to fetch stats...");
                const response = await axios.get("/api/stats", {
                    headers: {
                        'Cache-Control': 'no-cache',  
                    }
                });

                console.log("Received response:", response);

                // تحقق من وجود البيانات
                if (response.data && response.data.Data) {
                    console.log("Data fetched successfully:", response.data.Data);
                    setStats(response.data.Data);
                } else {
                    console.log("No data found in response:", response.data);
                }
            } catch (error) {
                console.log("Error during API call:", error);
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard
                        title="عدد المقالات"
                        count={stats.articleCount || 0}
                        color="bg-blue-500"
                        Icon={GrArticle}
                    />
                    <DashboardCard
                        title="عدد الرسائل"
                        count={stats.contactCount || 0}
                        color="bg-green-500"
                        Icon={MdMessage}
                    />
                    <DashboardCard
                        title="عدد العروض"
                        count={stats.offersCount || 0}
                        color="bg-yellow-500"
                        Icon={MdOutlineLocalOffer}
                    />
                    <DashboardCard
                        title="عدد المستخدمين"
                        count={stats.userCount || 0}
                        color="bg-red-500"
                        Icon={FiUsers}
                    />
                    <DashboardCard
                        title="عدد الزوار"
                        count={stats.visitorCount || 0} 
                        color="bg-purple-500"
                        Icon={BiSolidTrafficCone}
                    />
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
