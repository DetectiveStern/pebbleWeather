var UI = require('ui');
var ajax = require('ajax');
// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Make the request
var cityID = '5012639';
var myAPIKey = '1fc8429e27c8ad20be923d4a301db030';
var URL = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + myAPIKey;
ajax(
  {
    url: URL,
    type: 'json'
  },
  function fetchWeather(data) {
    // Success!
    console.log("Successfully fetched weather data!");

    // Extract data
    var location = data.name;
    var cntTemperature = Math.round(data.main.temp - 273.15) * 1.8 + 32 + "F";
    
    // Always upper-case first letter of description
    var description = data.weather[0].description;
	description = description.charAt(0).toUpperCase() + description.substring(1);
	
    var wind = "Wind: " + data.wind.speed + " mph";
    var tempHigh = Math.round(data.main.temp_max - 273.15) * 1.8 + 32 + "F";
    var tempLow = Math.round(data.main.temp_min - 273.15) * 1.8 + 32 + "F";
// Show to user
    card.subtitle(location + ", " + cntTemperature);
		card.body(description + "\n" + wind + "\n" + tempHigh + "/" + tempLow);
	},
    function fetchFailed(error) {
    // Failure!
     console.log('Failed fetching weather data: ' + error);
  }
);
