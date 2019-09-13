const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/2297f1c484b23e9322fb18c4787065da/${latitude},${longitude}?lang=en&units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log('Unable to connect to weather service!');
    } else if (body.error) {
      console.log('Unable to find location. Try again.');
    } else {
      const data = body;
      const today = data.daily.data[0];

      const temp = data.currently.temperature;
      const chanceOfRain = data.currently.precipProbability * 100;

      callback(
        undefined,
        `
        ${today.summary} 
        The current temperature is ${Math.floor(temp)} degrees out. 
        The lowest temperature today will be ${today.temperatureMin} degrees.
        The highest temperature today will be ${today.temperatureMax} degrees.
        There is ${chanceOfRain}% chance of rain.
        `
      );
    }
  });
};

module.exports = forecast;
