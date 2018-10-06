const data = require('./weatherData');

class WeatherService {

    getWeather(location, startDate, endData) {
        var forecastData = data.find(el => el.location.toLowerCase() == location.toLowerCase());

        if (!forecastData) {
            return null
        }
        else {
            return {
                location: forecastData.location,
                weather: forecastData.weather
            }
        }
    };
};

module.exports.WeatherService = WeatherService;
