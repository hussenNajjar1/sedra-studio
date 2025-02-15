
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