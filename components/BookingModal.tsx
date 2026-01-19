
import React, { useState, useEffect, useMemo } from 'react';
import { X, Zap, Users, Clock, Leaf, AlertCircle, IndianRupee, TrendingUp, Wallet } from 'lucide-react';
import { ParkingSlot, Booking } from '../types';
import { analyzeBookingImpact } from '../services/geminiService';
import { calculateDynamicRate } from '../utils/pricing';

interface BookingModalProps {
  slot: ParkingSlot;
  allSlots: ParkingSlot[];
  onClose: () => void;
  onConfirm: (booking: Omit<Booking, 'id' | 'userId'>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ slot, allSlots, onClose, onConfirm }) => {
  const [isEV, setIsEV] = useState(slot.type === 'EV');
  const [passengers, setPassengers] = useState(1);
  const [duration, setDuration] = useState(1);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const res = await analyzeBookingImpact({ type: slot.type, isEV, passengers, duration });
      setAiInsight(res);
      setLoading(false);
    };
    fetchInsight();
  }, [slot, isEV, passengers, duration]);

  const pricing = useMemo(() => 
    calculateDynamicRate(slot, allSlots, isEV, passengers, duration),
  [slot, allSlots, isEV, passengers, duration]);

  const calculateCredits = () => {
    let credits = 20; // Base participation credits
    if (isEV) credits += 50;
    if (passengers >= 2) credits += 80;
    if (duration <= 2) credits += 10;
    return credits;
  };

  const handleConfirm = () => {
    onConfirm({
      slotId: slot.id,
      startTime: new Date().toISOString(),
      isEV,
      passengerCount: passengers,
      estimatedDurationHours: duration,
      creditsEarned: calculateCredits(),
      co2Saved: 0.52,
      totalCost: pricing.totalCost
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-emerald-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Confirm Booking</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Slot {slot.number} • Level {slot.level}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Credit Earning Prediction */}
          <div className="bg-emerald-600 rounded-[32px] p-6 text-white shadow-lg shadow-emerald-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] opacity-80 uppercase font-black tracking-widest">Earnings this trip</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Wallet className="w-5 h-5" />
                  <span className="text-3xl font-black">+{calculateCredits()}</span>
                  <span className="text-xs font-bold opacity-80 uppercase">Carbon Credits</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-80 uppercase font-black">Fee</p>
                <p className="text-xl font-black">₹{pricing.totalCost}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-[10px] font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
               <TrendingUp className="w-3 h-3" />
               <span>SAVING {(pricing.savings / (pricing.totalCost + pricing.savings) * 100).toFixed(0)}% VS STANDARD RATE</span>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Vehicle & Trip Details</p>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-400 rounded-xl text-white shadow-md shadow-yellow-100"><Zap className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Electric Vehicle</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">+50 Credits</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={isEV} 
                onChange={(e) => setIsEV(e.target.checked)}
                className="w-6 h-6 accent-emerald-600 cursor-pointer rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500 rounded-xl text-white shadow-md shadow-blue-100"><Users className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Carpooling (2+)</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">+80 Credits</p>
                </div>
              </div>
              <select 
                value={passengers} 
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="bg-white border-none rounded-xl px-3 py-1 text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4+</option>
              </select>
            </div>
          </div>

          {aiInsight && (
            <div className="p-4 bg-slate-900 rounded-2xl flex space-x-3 items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <p className="text-[11px] text-emerald-50 font-medium leading-relaxed italic">"{aiInsight}"</p>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Back
          </button>
          <button 
            onClick={handleConfirm}
            className="flex-1 py-4 px-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2"
          >
            <span>Confirm & Pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
