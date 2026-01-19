
import { ParkingSlot, SlotStatus } from '../types';

const BASE_RATE = 40; // Base rate in ₹/hr

export const calculateDynamicRate = (
  slot: ParkingSlot,
  allSlots: ParkingSlot[],
  isEV: boolean,
  passengerCount: number,
  duration: number
) => {
  let rate = BASE_RATE;
  
  // 1. Time-based Peak Multiplier (Peak hours: 9-11 AM, 5-8 PM)
  const hour = new Date().getHours();
  const isPeak = (hour >= 9 && hour <= 11) || (hour >= 17 && hour <= 20);
  if (isPeak) {
    rate *= 1.5;
  }

  // 2. Demand-based Multiplier
  const occupiedCount = allSlots.filter(s => s.status === SlotStatus.OCCUPIED).length;
  const occupancyRate = occupiedCount / allSlots.length;
  if (occupancyRate > 0.8) {
    rate *= 1.3; // High demand
  } else if (occupancyRate < 0.3) {
    rate *= 0.9; // Low demand discount
  }

  // 3. Eco-Discounts
  let discount = 0;
  if (isEV) discount += 15; // ₹15 off for EVs
  if (passengerCount >= 2) discount += 10; // ₹10 off for carpooling
  if (duration <= 2) discount += 5; // ₹5 off for short stays

  const finalRate = Math.max(10, rate - discount); // Minimum ₹10/hr
  const totalCost = finalRate * duration;
  const originalCost = (isPeak ? BASE_RATE * 1.5 : BASE_RATE) * duration;
  
  return {
    hourlyRate: Math.round(finalRate),
    totalCost: Math.round(totalCost),
    savings: Math.max(0, Math.round(originalCost - totalCost)),
    isPeak
  };
};
