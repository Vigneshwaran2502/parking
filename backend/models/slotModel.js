export const slots = Array.from({ length: 40 }, (_, i) => {
    const isEV = i < 8;
    const isCarpool = i >= 8 && i < 15;
    const creditRequirement = isEV ? 100 : (isCarpool ? 50 : 0);

    return {
        id: `slot-${i}`,
        number: `${Math.floor(i / 10) + 1}${String.fromCharCode(65 + (i % 10))}`,
        status: Math.random() > 0.3 ? 'AVAILABLE' : 'OCCUPIED',
        type: isEV ? 'EV' : (isCarpool ? 'CARPOOL' : 'STANDARD'),
        level: Math.floor(i / 20) + 1,
        ecoScoreRequired: creditRequirement
    };
});
