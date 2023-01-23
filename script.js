// OpenWeather API Key | Name: 06weather_dashboard | Key: a2831cca70949f5de7cc390d196ae6cc

var APIKey = "a2831cca70949f5de7cc390d196ae6cc";

// According to the OpenWeather documentation on calling current weather data for one location, you can make an API call using just the city name

// Collect user input for just the city name and store it in a variable, as shown in the following code:

var city; 

// query URL

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=city&appid=a2831cca70949f5de7cc390d196ae6cc";


// Make the API Call Using Fetch

fetch(queryURL)
.then(function (response) {
    return response.json();
})

.then(function (data) {
    console.log(data);
}); 