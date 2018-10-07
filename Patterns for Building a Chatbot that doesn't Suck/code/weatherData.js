var data = [
    {
        location: 'New York',
        weather: [
            { date: dateOffsetFromToday(0), sky: 'Sunny', high: 90, low: 76, precipChance: 0, precipType: undefined, windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(1), sky: 'Sunny', high: 45, low: -10, precipChance: 0, precipType: undefined, windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(2), sky: 'Partly Cloudy', high: 36, low: 5, precipChance: 0.8, precipType: 'Snow', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(3), sky: 'Partly Cloudy', high: 36, low: 5, precipChance: 0.8, precipType: 'Snow', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(4), sky: 'Partly Cloudy', high: 36, low: 5, precipChance: 0.8, precipType: 'Snow', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(5), sky: 'Partly Cloudy', high: 36, low: 5, precipChance: 0.8, precipType: 'Snow', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(6), sky: 'Cloudy', high: 78, low: 52, precipChance: 0.2, precipType: 'Rain', windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(7), sky: 'Cloudy', high: 78, low: 52, precipChance: 0.2, precipType: 'Rain', windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(8), sky: 'Cloudy', high: 78, low: 52, precipChance: 0.2, precipType: 'Rain', windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(9), sky: 'Sunny', high: 75, low: 50, precipChance: 0.6, precipType: 'Rain', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(10), sky: 'Sunny', high: 70, low: 45, precipChance: 0.8, precipType: 'Fog', windSpeed: 25, windDirection: 'SE' },
        ],
    },
    {
        location: 'Chicago',
        weather: [
            { date: dateOffsetFromToday(0), sky: 'Cloudy', high: 70, low: 60, precipChance: 0.9, precipType: 'rain', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(1), sky: 'Sunny', high: 80, low: 45, precipChance: 0, precipType: undefined, windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(2), sky: 'Partly Cloudy', high: 76, low: 55, precipChance: 0.8, precipType: 'fog', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(3), sky: 'Partly Cloudy', high: 76, low: 55, precipChance: 0.8, precipType: 'fog', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(4), sky: 'Partly Cloudy', high: 76, low: 55, precipChance: 0.8, precipType: 'fog', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(5), sky: 'Partly Cloudy', high: 76, low: 55, precipChance: 0.8, precipType: 'fog', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(6), sky: 'Cloudy', high: 78, low: 52, precipChance: 0, precipType: undefined, windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(7), sky: 'Cloudy', high: 78, low: 52, precipChance: 0.2, precipType: 'Rain', windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(8), sky: 'Cloudy', high: 78, low: 52, precipChance: 0.2, precipType: 'Rain', windSpeed: 10, windDirection: 'NW' },
            { date: dateOffsetFromToday(9), sky: 'Sunny', high: 75, low: 50, precipChance: 0.6, precipType: 'Rain', windSpeed: 15, windDirection: 'NE' },
            { date: dateOffsetFromToday(10), sky: 'Sunny', high: 70, low: 45, precipChance: 0.8, precipType: 'Fog', windSpeed: 25, windDirection: 'SE' },
        ]
    },
];

function dateOffsetFromToday(daysFromToday) {
    var date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    
    return date;
}


module.exports = data;