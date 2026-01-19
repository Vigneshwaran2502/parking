
import React from 'react';
import { Leaf, MapPin, BarChart2, LayoutDashboard, User, TreeDeciduous } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'map' | 'analytics';
  setActiveTab: (tab: 'dashboard' | 'map' | 'analytics') => void;
  canopyLevel: number;
  treesPlanted: number;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, canopyLevel, treesPlanted }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-2xl shadow-lg shadow-emerald-100">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">ParkWise <span className="text-emerald-600">Green</span></span>
          </div>
          
          <nav className="hidden md:flex space-x-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-700 font-medium'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all duration-300 ${activeTab === 'map' ? 'bg-white shadow-sm text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-700 font-medium'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Parking</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all duration-300 ${activeTab === 'analytics' ? 'bg-white shadow-sm text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-700 font-medium'}`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>City Hub</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
              <div className="relative">
                <TreeDeciduous className="w-6 h-6 text-emerald-600" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none mb-1">Green Canopy</p>
                <div className="flex items-center space-x-2">
                   <div className="w-20 h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${canopyLevel}%` }}></div>
                   </div>
                   <span className="text-[10px] font-black text-emerald-600">{treesPlanted} 🌲</span>
                </div>
              </div>
            </div>
            <button className="p-2.5 rounded-2xl hover:bg-slate-100 text-slate-500 border border-transparent hover:border-slate-200 transition-all">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
