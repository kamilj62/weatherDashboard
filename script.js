// Elements stored from HTML
var cityButtonEl = document.getElementById("cityButton");
var cityNameEl = document.getElementById("cityName");
var apiKey = '5c7bbb9b2135cd2940045fc0c9f3f01f';
var currentDateEl = document.getElementById('currentDate');
var locationEl = document.getElementById("location");
var currentTempEl = document.getElementById('currentTemp');
var currentWeatherEl = document.getElementById('currentWeather');
var currentIconEl = document.getElementById('currentIcon');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var hiddenEl = document.querySelector('.hidden');

var searchedHistory = [];

var forcast = function (lat, long) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=imperial';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            currentWeather(data.city.coord.lat, data.city.coord.lon);
            displayFive(data);
            console.log('displayFive', data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to forecast');
      });
};

// show location of city typed in the search
function displayLocation(data) {

  currentDateEl.textContent = "Today's Date: " + new Date().toLocaleDateString();
  locationEl.textContent = "Current location: " + data.name
  
  // Added only one weather icon
  var weatherIcon = document.createElement('img');
  weatherIcon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
  while (currentIconEl.firstChild) {
    currentIconEl.firstChild.remove();
  }
  currentIconEl.appendChild(weatherIcon);
  

  currentTempEl.textContent = "Current Temperature: " + data.main.temp + '°F';
  currentWeatherEl.textContent = "Current Weather: " + data.weather[0].main;
  currentWindEl.textContent = "Current Wind: " + data.wind.speed + ' m/s';
  currentHumidityEl.textContent = "Current Humidity: " + data.main.humidity + '%';      
  
}

// show the five day forecast
function displayFive(info) {
  const container = document.getElementById('container');

  container.innerHTML = '';

  for (let i = 1; i < info.list.length; i += 8) {

    const element = document.createElement('div');
    element.classList.add('m-2');
    element.classList.add('border');

    const date = document.createElement('p');
    date.textContent = info.list[i].dt_txt;
    element.appendChild(date);

    const temperature = document.createElement('p');
    temperature.textContent = 'Temperature: ' + info.list[i].main.temp + '°F';
    element.appendChild(temperature);

    const weather = document.createElement('p');
    weather.textContent = 'Weather: ' + info.list[i].weather[0].main;
    element.appendChild(weather);

    const weatherIcon = document.createElement('img');
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + info.list[i].weather[0].icon + '@2x.png';
    element.appendChild(weatherIcon);

    const windSpeed = document.createElement('p');
    windSpeed.textContent = 'Wind Speed: ' + info.list[i].wind.speed + 'm/s';
    element.appendChild(windSpeed);

    const humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + info.list[i].main.humidity + '%';
    element.appendChild(humidity);
    
    container.appendChild(element);
  }
}

// acquire latitude and longitude coordinates 
function passLocations(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude; 
  forcast(lat, long);  
  currentWeather(lat, long);
} 

// obtain weather at location now
var currentWeather = function (lat, long) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}&units=imperial`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayLocation(data);
            console.log('displayLocation', data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to city');
      });
};

// obtain coordinates of city
var getLocation = function(city) {
  var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  fetch(geoUrl)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      forcast(data[0].lat, data[0].lon);
      currentWeather(data[0].lat, data[0].lon)
    })
}

// click button to search for city 
cityButtonEl.addEventListener('click', function(event) {
  event.preventDefault();
  var name = cityNameEl.value;

  if (name === "") {
    alert('Please enter a city');
  }
  else {
    hiddenEl.classList.remove('hidden');
    getLocation(name);
    cityNameEl.value = ""; // Clear the input field after submitting

    // Add the city name to the searchedHistory array in localStorage
    searchedHistory.push(name);
    localStorage.setItem('searchHistory', JSON.stringify(searchedHistory));

    // Create a new city button and add it to the city buttons container
    var cityButtonContainer = document.getElementById('cityButtonContainer');
    var cityButton = document.createElement('button');
    cityButton.textContent = name;
    cityButton.classList.add('btn', 'bg-secondary-subtle', 'text-dark', 'mb-3', 'w-100');
    cityButtonContainer.appendChild(cityButton);

    // Add event listener to the new city button
    cityButton.addEventListener('click', function(event) {
      event.preventDefault();
      var clickedCity = this.textContent;

      getLocation(clickedCity);
    
  });
}
});