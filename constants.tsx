
import React from 'react';
import { Zap, Users, Clock, Train, ShoppingBag, BatteryCharging } from 'lucide-react';
import { ParkingSlot, SlotStatus, RewardItem } from './types';

export const CHENNAI_LOCATIONS = [
  { id: 't-nagar', name: 'T. Nagar Multi-level Parking', lat: 13.0418, lng: 80.2341 },
  { id: 'omr', name: 'OMR IT Corridor Hub', lat: 12.9229, lng: 80.2312 },
  { id: 'marina', name: 'Marina Beach Eco-Zone', lat: 13.0475, lng: 80.2824 },
  { id: 'anna-nagar', name: 'Anna Nagar Tower Park', lat: 13.0850, lng: 80.2101 },
];

export const REWARDS_MARKETPLACE: RewardItem[] = [
  { id: 'r1', title: 'Free CMRL Trip', provider: 'Chennai Metro', cost: 150, icon: 'Train', category: 'TRANSPORT' },
  { id: 'r2', title: '₹100 Retail Voucher', provider: 'Saravana Stores', cost: 300, icon: 'ShoppingBag', category: 'RETAIL' },
  { id: 'r3', title: 'Fast Charge (30m)', provider: 'TNEB Green', cost: 100, icon: 'BatteryCharging', category: 'ENERGY' },
  { id: 'r4', title: 'Phoenix Marketcity Coupon', provider: 'Phoenix Mall', cost: 500, icon: 'ShoppingBag', category: 'RETAIL' },
];

export const MOCK_SLOTS: ParkingSlot[] = Array.from({ length: 40 }, (_, i) => {
  const isEV = i < 8;
  const isCarpool = i >= 8 && i < 15;
  const creditRequirement = isEV ? 100 : (isCarpool ? 50 : 0);
  
  return {
    id: `slot-${i}`,
    number: `${Math.floor(i / 10) + 1}${String.fromCharCode(65 + (i % 10))}`,
    status: Math.random() > 0.3 ? SlotStatus.AVAILABLE : SlotStatus.OCCUPIED,
    type: isEV ? 'EV' : (isCarpool ? 'CARPOOL' : 'STANDARD'),
    level: Math.floor(i / 20) + 1,
    ecoScoreRequired: creditRequirement
  };
});

export const SCORING_RULES = [
  { icon: <Zap className="w-5 h-5 text-yellow-500" />, label: 'Electric Vehicle', points: '+50 Credits', description: 'Zero tailpipe emissions.' },
  { icon: <Users className="w-5 h-5 text-blue-500" />, label: 'Carpooling (2+)', points: '+80 Credits', description: 'Sharing the ride reduces congestion.' },
  { icon: <Clock className="w-5 h-5 text-green-500" />, label: 'Short Stay (<2h)', points: '+20 Credits', description: 'Promotes high turnover.' },
];

export const EMISSION_FACTOR = 0.2;
export const AVG_SEARCH_REDUCTION_KM = 2.6;
