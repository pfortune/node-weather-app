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
      const summary = data.daily.data[0].summary;

      const temp = data.currently.temperature;
      const chanceOfRain = data.currently.precipProbability * 100;

      callback(
        undefined,
        `${summary} It is currently ${Math.floor(
          temp
        )} degrees out. There is ${chanceOfRain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
