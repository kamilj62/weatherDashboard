var cityButtonEl = document.getElementById("cityButton");
var cityNameEl = document.getElementById("cityName");
var apiKey = '5c7bbb9b2135cd2940045fc0c9f3f01f';
var currentDateEl = document.getElementById('currentDate');
var locationEl = document.getElementById("location");
var currentTempEl = document.getElementById('currentTemp');
var currentWeatherEl = document.getElementById('currentWeather');
var currentIconEl = document.getElementById('currentIcon')
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var hiddenEl = document.getElementsByClassName('hidden');

var getLocation = function() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(passLocations);
    } else {
      alert('Not able to find your location')
    }
  }

var forcast = function (lat, long) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=5c7bbb9b2135cd2940045fc0c9f3f01f&units=imperial';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            currentWeather(data.city.coord.lat, data.city.coord.lon);
            displayFive(data);
            console.log('data', data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to forecast');
      });

  };

function displayLocation(data) {
  locationEl.textContent = "Current location: " + data.name;
  currentTempEl.textContent = "Current Temperature: " + data.main.temp + '°F';
  currentIconEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
  currentWeatherEl.textContent = "Current Weather: " + data.weather[0].main;
  currentWindEl.textContent = "Current Wind: " + data.wind.speed + ' m/s';
  currentHumidityEl.textContent = "Current Humidity: " + data.main.humidity + '%';                            
  
}

function displayFive(info) {
  const container = document.getElementById('container');

  for (let i = 1; i < info.list.length; i += 8) {
    const element = document.createElement('div');

    const date = document.createElement('p');
    date.textContent = info.list[i].dt_txt;
    element.appendChild(date);

    const temperature = document.createElement('p');
    temperature.textContent = 'Temperature: ' + info.list[i].main.temp;
    element.appendChild(temperature);

    const weather = document.createElement('p');
    weather.textContent = 'Weather: ' + info.list[i].weather[0].main;
    element.appendChild(weather);

    const weatherIcon = document.createElement('img');
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + info.list[i].weather[0].icon + '@2x.png';
    element.appendChild(weatherIcon);

    const windSpeed = document.createElement('p');
    windSpeed.textContent = 'Wind Speed: ' + info.list[i].wind.speed;
    element.appendChild(windSpeed);

    const humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + info.list[i].main.humidity;
    element.appendChild(humidity);
    '\n'
    
    container.appendChild(element);
  }
}


function passLocations(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude; 
  forcast(lat, long);  
  currentWeather(lat, long);
  displayLocation(lat, long);
  displayFive(lat, long);
} 

var currentWeather = function (lat, long) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}&units=imperial`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayLocation(data);
            
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to city');
      });

  };

var getLocation = function(city) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  fetch(geoUrl)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      forcast(data[0].lat, data[0].lon);
      currentWeather(data[0].lat, data[0].lon)
    })
}


cityButtonEl.addEventListener('click', function(event) {
  event.preventDefault();
  var name = cityNameEl.value;
  //hiddenEl.classList.toggle('hidden');
  getLocation(name);
  

})