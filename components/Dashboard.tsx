
import React, { useState, useEffect } from 'react';
import { Leaf, Zap, BarChart, TrendingUp, Wallet, Calendar, ChevronRight, IndianRupee, Map, Gift, Train, TreeDeciduous, Wind } from 'lucide-react';
import { getGreenAdvice } from '../services/geminiService';
import { UserStats } from '../types';
import { REWARDS_MARKETPLACE } from '../constants';

interface DashboardProps {
  stats: UserStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const [advice, setAdvice] = useState<string>("Analyzing your canopy growth...");

  useEffect(() => {
    const fetchAdvice = async () => {
      const res = await getGreenAdvice(`User has ${stats.treesPlanted} fully grown virtual trees. Canopy growth at ${stats.canopyLevel}%. Total CO2 saved: ${stats.totalCO2Saved}kg.`);
      setAdvice(res);
    };
    fetchAdvice();
  }, [stats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Virtual Canopy Visualization */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4 bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/10">
                  <TreeDeciduous className="w-4 h-4 text-emerald-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Chennai Virtual Canopy</span>
                </div>
                <h2 className="text-4xl font-black mb-2">Your <span className="text-emerald-300">Neem Tree</span></h2>
                <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm">
                  Every sustainable trip adds life to your canopy. Complete this tree to fund a real sapling in the Chennai Metro green belt.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-emerald-200">Growth Progress</span>
                  <span className="text-2xl font-black">{stats.canopyLevel}%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-1000 relative" 
                    style={{ width: `${stats.canopyLevel}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-emerald-300/50">
                  <span>Sapling</span>
                  <span>Full Maturity</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                <svg width="240" height="240" viewBox="0 0 100 100" className="relative z-10 transition-transform duration-700 group-hover:scale-105">
                  <path d="M50 85 V60" stroke="#4a3728" strokeWidth="4" strokeLinecap="round" />
                  <path 
                    d="M50 60 Q30 50 50 20 Q70 50 50 60" 
                    fill="#10b981" 
                    className="transition-all duration-1000"
                    style={{ 
                      opacity: stats.canopyLevel > 10 ? 1 : 0.2,
                      transform: `scale(${0.4 + (stats.canopyLevel / 100) * 0.6})`,
                      transformOrigin: '50% 60%'
                    }}
                  />
                  {stats.canopyLevel > 50 && (
                    <circle cx="40" cy="40" r="15" fill="#059669" opacity="0.8" />
                  )}
                  {stats.canopyLevel > 80 && (
                    <circle cx="60" cy="35" r="18" fill="#047857" opacity="0.9" />
                  )}
                </svg>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Total Trees: {stats.treesPlanted}
                </div>
              </div>
            </div>
          </div>
          
          <Wind className="absolute -left-12 bottom-20 w-32 h-32 text-white/5 animate-pulse" />
          <Leaf className="absolute -right-12 top-20 w-48 h-48 text-white/5 rotate-45" />
        </div>

        {/* Air Guardian Panel */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Air Guardian</h3>
               <Wind className="w-5 h-5 text-emerald-500" />
             </div>
             
             <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local AQI Saved</p>
                    <p className="text-xl font-black text-slate-900">0.032 <span className="text-xs font-normal text-slate-400">ppm avoided</span></p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Green Wallet Gain</p>
                    <p className="text-xl font-black text-slate-900">₹{stats.totalSavedOnGreen}</p>
                  </div>
                </div>
             </div>
           </div>

           <div className="bg-slate-900 p-6 rounded-[32px] text-white">
             <div className="flex items-center space-x-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                 <Leaf className="w-4 h-4 text-white" />
               </div>
               <h3 className="font-bold text-sm">Sustainability AI</h3>
             </div>
             <p className="text-xs text-slate-300 italic leading-relaxed">
               "{advice}"
             </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Eco-Rewards</h3>
            <Gift className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-3">
             {REWARDS_MARKETPLACE.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                   <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3">
                      {item.icon === 'Train' ? <Train className="w-5 h-5 text-blue-500" /> : <Gift className="w-5 h-5 text-pink-500" />}
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{item.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{item.provider}</p>
                   </div>
                   <div className="flex items-center text-[10px] font-black text-emerald-600">
                      {item.cost} <Wallet className="w-3 h-3 ml-1" />
                   </div>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm md:col-span-2">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Neighborhood Pulse</h3>
              <Map className="w-5 h-5 text-slate-300" />
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { zone: 'T. Nagar', level: 85, color: 'bg-emerald-500' },
                { zone: 'OMR Hub', level: 40, color: 'bg-blue-500' },
                { zone: 'Marina', level: 12, color: 'bg-teal-500' },
                { zone: 'Anna Nagar', level: 65, color: 'bg-green-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{item.zone}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-800">{item.level}%</span>
                    <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`}></div>
                  </div>
                  <div className="w-full h-1 bg-slate-200 rounded-full mt-3">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.level}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-4">
    <div className={`p-3 rounded-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{label}</p>
      <h4 className="text-xl font-black text-slate-900">{value}</h4>
      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{sub}</p>
    </div>
  </div>
);

export default Dashboard;
