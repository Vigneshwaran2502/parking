
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ParkingGrid from './components/ParkingGrid';
import BookingModal from './components/BookingModal';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';
import { ParkingSlot, SlotStatus, UserStats, Booking } from './types';
import { MOCK_SLOTS, CHENNAI_LOCATIONS } from './constants';
// Fixed error: Added 'Leaf' to the lucide-react imports to resolve "Cannot find name 'Leaf'" on line 139.
import { MapPin, Info, Search, LayoutDashboard, BarChart2, ChevronRight, Leaf, RefreshCw } from 'lucide-react';

import { fetchSlots, fetchUserStats, createBooking } from './services/api';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'analytics'>('dashboard');
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalCO2Saved: 0,
    totalBookings: 0,
    carbonCredits: 0,
    totalSpent: 0,
    totalSavedOnGreen: 0,
    canopyLevel: 0,
    treesPlanted: 0
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<Partial<Booking> | null>(null);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [slotsData, statsData] = await Promise.all([fetchSlots(), fetchUserStats()]);
        setSlots(slotsData);
        setUserStats(statsData);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };
    loadData();
  }, []);

  // Polling for updates (simulating real-time)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const slotsData = await fetchSlots();
        setSlots(slotsData);
      } catch (e) { console.error(e); }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmBooking = (bookingData: any) => {
    setPendingBooking(bookingData);
    setSelectedSlot(null);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (method: 'UPI' | 'CARD') => {
    if (!pendingBooking) return;

    try {
      // API call
      await createBooking({
        slotId: pendingBooking.slotId!,
        user: 'demo', // Hardcoded for prototype
        startTime: pendingBooking.startTime || new Date().toISOString(),
        endTime: new Date(Date.now() + (pendingBooking.estimatedDurationHours || 1) * 3600000).toISOString()
      });

      // Refresh data
      const [slotsData, statsData] = await Promise.all([fetchSlots(), fetchUserStats()]);
      setSlots(slotsData);
      setUserStats(statsData);

      // alert("Booking Confirmed! You've earned carbon credits.");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    } finally {
      setShowPaymentModal(false);
      setPendingBooking(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        canopyLevel={userStats.canopyLevel}
        treesPlanted={userStats.treesPlanted}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard stats={userStats} />
        )}

        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Chennai Parking Hub</h2>
                <p className="text-sm text-slate-500 font-medium">Eco-prioritized real-time availability</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search neighborhoods..."
                    className="pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-[20px] text-sm w-full md:w-80 focus:ring-4 focus:ring-emerald-500/10 outline-none shadow-sm transition-all"
                  />
                </div>
                <button
                  onClick={async () => {
                    const data = await fetchSlots();
                    setSlots(data);
                  }}
                  className="p-3 bg-white text-emerald-600 rounded-[20px] hover:bg-emerald-50 transition-all border border-slate-100 shadow-sm group"
                  title="Refresh Slots"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
                <button className="p-3 bg-white text-emerald-600 rounded-[20px] hover:bg-emerald-50 transition-all border border-slate-100 shadow-sm group">
                  <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
                  <h3 className="font-black text-slate-900 mb-6 flex items-center space-x-3 text-sm uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Nearby Green Zones</span>
                  </h3>
                  <div className="space-y-3">
                    {CHENNAI_LOCATIONS.map(loc => (
                      <button key={loc.id} className="w-full text-left p-5 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 flex justify-between items-center group">
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{loc.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">0.8 km • 12 slots available</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                  <div className="relative z-10 flex space-x-4">
                    <div className="p-3 bg-emerald-500 rounded-2xl h-fit">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Canopy Boost Alert</p>
                      <p className="text-sm text-slate-200 leading-relaxed font-medium">
                        EVs at OMR Hub earn <span className="text-emerald-300 font-bold">2x leaf growth tokens</span> for the next 4 hours.
                      </p>
                    </div>
                  </div>
                  <Leaf className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5" />
                </div>
              </div>

              <div className="lg:col-span-2">
                <ParkingGrid
                  slots={slots}
                  onSelectSlot={(slot) => setSelectedSlot(slot)}
                  userScore={userStats.carbonCredits / 10}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <AdminPanel />
        )}
      </main>

      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          allSlots={slots}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showPaymentModal && pendingBooking && (
        <PaymentModal
          amount={pendingBooking.totalCost || 0}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentSuccess}
        />
      )}

      {/* Mobile Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[40px] shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ${activeTab === 'dashboard' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ${activeTab === 'map' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Explore</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ${activeTab === 'analytics' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <BarChart2 className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Stats</span>
        </button>
      </div>
    </div>
  );
};

export default App;
