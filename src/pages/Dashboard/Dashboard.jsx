import ChartCard from "../../pages/Dashboard/components/ChartCard";

export default function Dashboard() {
  
  const stats = {
    listings: 12,
    bookings: 34,
    revenue: 1450,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Listings</div>
          <div className="text-2xl font-bold">{stats.listings}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Bookings</div>
          <div className="text-2xl font-bold">{stats.bookings}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-bold">${stats.revenue}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Bookings Trend" />
        <ChartCard title="Top Cars" />
      </div>
    </div>
  );
}
