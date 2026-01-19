
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Truck, Zap, Activity } from 'lucide-react';

const data = [
  { name: '8 AM', emissions: 40, usage: 24, ev: 4 },
  { name: '10 AM', emissions: 85, usage: 80, ev: 12 },
  { name: '12 PM', emissions: 70, usage: 75, ev: 18 },
  { name: '2 PM', emissions: 65, usage: 60, ev: 15 },
  { name: '4 PM', emissions: 90, usage: 95, ev: 22 },
  { name: '6 PM', emissions: 75, usage: 88, ev: 14 },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Chennai Smart City Analytics</h2>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <MetricCard title="Avg. Search Time" value="4.2 mins" change="-28%" trend="down" icon={<Activity className="text-blue-600" />} />
         <MetricCard title="EV Adoption Rate" value="18.5%" change="+5.2%" trend="up" icon={<Zap className="text-yellow-600" />} />
         <MetricCard title="Carpool Ratio" value="32%" change="+12%" trend="up" icon={<Users className="text-purple-600" />} />
         <MetricCard title="CO2 Offset" value="1.2 Tons" change="+15%" trend="up" icon={<Truck className="text-green-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Parking Utilization vs EV Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#10b981" fill="#d1fae5" />
                <Area type="monotone" dataKey="ev" stroke="#f59e0b" fill="#fef3c7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Hourly Emission Impact (kg CO2)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="emissions" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">High-Demand Green Zones</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 uppercase text-[10px] tracking-widest font-bold">
                <th className="pb-3">Zone Name</th>
                <th className="pb-3 text-center">Occupancy</th>
                <th className="pb-3 text-center">Eco-Score Avg</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'T. Nagar MLCP', occupancy: '92%', score: '3.8', status: 'Peak' },
                { name: 'OMR IT Park', occupancy: '74%', score: '3.2', status: 'Stable' },
                { name: 'Anna Nagar Mall', occupancy: '88%', score: '2.9', status: 'Peak' },
                { name: 'Central Station', occupancy: '65%', score: '3.5', status: 'Stable' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-semibold text-gray-900">{row.name}</td>
                  <td className="py-4 text-center text-gray-600 font-medium">{row.occupancy}</td>
                  <td className="py-4 text-center text-gray-600 font-medium">{row.score}</td>
                  <td className="py-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${row.status === 'Peak' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, trend, icon }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className={`text-xs font-bold ${trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>{change}</span>
    </div>
    <h4 className="text-xl font-extrabold text-gray-900">{value}</h4>
    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{title}</p>
  </div>
);

export default AdminPanel;
