
import React from 'react';
import { ParkingSlot, SlotStatus } from '../types';
import { Zap, Users, ShieldCheck, Ban } from 'lucide-react';

interface ParkingGridProps {
  slots: ParkingSlot[];
  onSelectSlot: (slot: ParkingSlot) => void;
  userScore: number;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ slots, onSelectSlot, userScore }) => {
  const getSlotColor = (slot: ParkingSlot) => {
    if (slot.status === SlotStatus.OCCUPIED) return 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-60';
    if (slot.type === 'EV') return 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100';
    if (slot.type === 'CARPOOL') return 'bg-blue-50 border-blue-300 hover:bg-blue-100';
    return 'bg-green-50 border-green-300 hover:bg-green-100';
  };

  const isEligible = (slot: ParkingSlot) => {
    if (slot.status === SlotStatus.OCCUPIED) return false;
    // Premium slots require score
    return userScore >= slot.ecoScoreRequired;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Live Parking Grid</h3>
        <div className="flex space-x-4 text-xs font-medium text-gray-500">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>Available</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>Occupied</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>EV Priority</div>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {slots.map((slot) => {
          const eligible = isEligible(slot);
          return (
            <button
              key={slot.id}
              disabled={slot.status === SlotStatus.OCCUPIED || !eligible}
              onClick={() => onSelectSlot(slot)}
              className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all ${getSlotColor(slot)} ${!eligible && slot.status === SlotStatus.AVAILABLE ? 'grayscale cursor-help' : ''}`}
              title={!eligible ? `Score ${slot.ecoScoreRequired} required` : slot.number}
            >
              <span className="text-[10px] font-bold text-gray-600 mb-1">{slot.number}</span>
              {slot.type === 'EV' && <Zap className={`w-4 h-4 ${slot.status === SlotStatus.OCCUPIED ? 'text-gray-400' : 'text-yellow-600'}`} />}
              {slot.type === 'CARPOOL' && <Users className={`w-4 h-4 ${slot.status === SlotStatus.OCCUPIED ? 'text-gray-400' : 'text-blue-600'}`} />}
              {slot.type === 'STANDARD' && slot.status === SlotStatus.AVAILABLE && eligible && <ShieldCheck className="w-4 h-4 text-green-600" />}
              
              {!eligible && slot.status === SlotStatus.AVAILABLE && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-xl">
                  <Ban className="w-5 h-5 text-gray-400 opacity-50" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-bold text-green-700">AI Note:</span> Slots closer to the exit are prioritized for high Eco-Score users to minimize low-speed internal lot movement and emissions.
        </p>
      </div>
    </div>
  );
};

export default ParkingGrid;
