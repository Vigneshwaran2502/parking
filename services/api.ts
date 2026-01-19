const API_BASE_URL = 'http://localhost:5000/api';

export const fetchSlots = async () => {
    const response = await fetch(`${API_BASE_URL}/slots`);
    if (!response.ok) throw new Error('Failed to fetch slots');
    return response.json();
};

export const createBooking = async (bookingData: any) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
};

export const fetchUserStats = async () => {
    const response = await fetch(`${API_BASE_URL}/users/stats`);
    if (!response.ok) throw new Error('Failed to fetch user stats');
    return response.json();
};
