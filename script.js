// Define variables by id 
var cityInput= document.querySelector("#city");
var searchCity= document.querySelector("#searchCity");
var citySearchInput= document.querySelector("#currentCity");
var weatherColumn= document.querySelector("#currentWeatherColumn");
var forecastId= document.querySelector("#forecast");
var forecastColumn= document.querySelector("#fiveDayColumn");
var searchHistoryBtn= document.querySelector("#searchHistory");

var cities = [];

// Event handler for weather by submit btn 

var submitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        getWeather(city);
        get5day(city);
        cities.unshift({city});
        cityInput.value = "";
    } else{
        alert("Enter a City");
    }
    storeSearch();
    previousSearch(city);
}

// Store search input to localStorage 

var storeSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

// get current weather by API url and key 

var getWeather = function(city){
    var APIkey = "a2831cca70949f5de7cc390d196ae6cc"
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`

    fetch(queryURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

// Display weather data 

var displayWeather = function(weather, searchCity){
//   Clear search 
   weatherColumn.textContent= "";  
   citySearchInput.textContent=searchCity;

// Display Current Day 
   var currentDay = document.createElement("span")
   currentDay.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInput.appendChild(currentDay);

//    Weather icon 
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInput.appendChild(weatherIcon);

// Display data for temperature 
   var temperatureInput = document.createElement("span");
   temperatureInput.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureInput.classList = "list-group-item"
  
// Display data for humidity
   var humidityInout = document.createElement("span");
   humidityInout.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityInout.classList = "list-group-item"

// Display data for wind speed
   var windSpeedInput = document.createElement("span");
   windSpeedInput.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedInput.classList = "list-group-item"

// Append to current weather column 
   weatherColumn.appendChild(temperatureInput);
   weatherColumn.appendChild(humidityInout);
   weatherColumn.appendChild(windSpeedInput);

}


var previousSearch = function(previousSearch){


    previousSearchEl = document.createElement("button");
    previousSearchEl.textContent = previousSearch;
    previousSearchEl.classList = "d-flex w-100 btn-light border p-2";
    previousSearchEl.setAttribute("data-city",previousSearch)
    previousSearchEl.setAttribute("type", "submit");

    searchHistoryBtn.prepend(previousSearchEl);
}

var previousSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getWeather(city);
        get5day(city);
    }
}


searchCity.addEventListener("submit", submitHandler);
searchHistoryBtn.addEventListener("click", previousSearchHandler);