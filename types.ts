
export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  EV_ONLY = 'EV_ONLY'
}

export interface ParkingSlot {
  id: string;
  number: string;
  status: SlotStatus;
  type: 'STANDARD' | 'EV' | 'CARPOOL';
  level: number;
  ecoScoreRequired: number;
}

export interface UserStats {
  totalCO2Saved: number; // in kg
  totalBookings: number;
  carbonCredits: number;
  totalSpent: number;
  totalSavedOnGreen: number;
  canopyLevel: number; // 0 to 100 percentage of current tree growth
  treesPlanted: number; // Number of "fully grown" virtual trees
}

export interface RewardItem {
  id: string;
  title: string;
  provider: string;
  cost: number;
  icon: string;
  category: 'TRANSPORT' | 'RETAIL' | 'ENERGY';
}

export interface Booking {
  id: string;
  slotId: string;
  userId: string;
  startTime: string;
  isEV: boolean;
  passengerCount: number;
  estimatedDurationHours: number;
  creditsEarned: number;
  co2Saved: number;
  totalCost: number;
}
