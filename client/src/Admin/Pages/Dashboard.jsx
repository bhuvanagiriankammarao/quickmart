import React from 'react';
import { dashboardData } from '../../data/index';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Sample data for Categories
const salesByCategoryData = [
  { name: 'Fruits & Vegetables', value: 22, color: '#4f46e5' },
  { name: 'Dairy & Bakery', value: 20, color: '#10b981' },
  { name: 'Food grain, Oil & Masala', value: 7, color: '#f97316' },
  { name: 'Biscuits & Cookies', value: 34, color: '#3b82f6' },
  { name: 'Hair Care', value: 17, color: '#ef4444' },
];

// Sample data for Revenue vs Order
const revenueVsOrdersData = [
  { name: 'Jan', Revenue: 450, Order: 200 },
  { name: 'Feb', Revenue: 700, Order: 300 },
  { name: 'Mar', Revenue: 600, Order: 250 },
  { name: 'Apr', Revenue: 800, Order: 400 },
  { name: 'May', Revenue: 650, Order: 350 },
  { name: 'Jun', Revenue: 900, Order: 500 },
  { name: 'Jul', Revenue: 1200, Order: 600 },
  { name: 'Aug', Revenue: 850, Order: 400 },
  { name: 'Sep', Revenue: 950, Order: 450 },
  { name: 'Oct', Revenue: 1100, Order: 550 },
  { name: 'Nov', Revenue: 1050, Order: 500 },
  { name: 'Dec', Revenue: 1150, Order: 600 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back, Pavan</h2>
      <p className="text-gray-500 mb-8">Be Happy, welcome back pavan</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
     {/* Average Revenue */}
     <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">Average Revenue</h3>
        <p className="text-3xl font-bold">{dashboardData.totalSales}</p>
      </div>
      <div className="text-4xl opacity-50">
        <i className="fas fa-dollar-sign"></i> {/* Or use an SVG icon */}
      </div>
    </div>
  </div>

  {/* Total Orders */}
  <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">Total Orders</h3>
        <p className="text-3xl font-bold">{dashboardData.totalOrders}</p>
      </div>
      <div className="text-4xl opacity-50">
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  </div>

  {/* Total Customers */}
  <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">Total Customers</h3>
        <p className="text-3xl font-bold">{dashboardData.totalCustomers}</p>
      </div>
      <div className="text-4xl opacity-50">
        <i className="fas fa-users"></i>
      </div>
    </div>
  </div>

  {/* Low Stock Products */}
  <div className="p-6 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">Low Stock Products</h3>
        <p className="text-3xl font-bold">{dashboardData.lowStockProducts}</p>
      </div>
      <div className="text-4xl opacity-50">
        <i className="fas fa-box-open"></i>
      </div>
    </div>
  </div>
</div>


      {/* Revenue vs Orders Chart */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue vs Order</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueVsOrdersData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line type="monotone"
                  dataKey="Revenue" 
                  stroke="url(#colorRevenue)" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Order" 
                  stroke="url(#colorOrder)" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} />
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by Category Donut Chart */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={salesByCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {salesByCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-gray-500 font-medium">Order ID</th>
              <th className="py-2 px-4 text-gray-500 font-medium">Customer</th>
              <th className="py-2 px-4 text-gray-500 font-medium">Order Date</th>
              <th className="py-2 px-4 text-gray-500 font-medium">Status</th>
              <th className="py-2 px-4 text-gray-500 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentOrders?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 text-gray-700">{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-gray-700">{order.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700 font-semibold">
                  Rs.{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
