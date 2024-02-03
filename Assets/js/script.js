var cityButtonEl = document.getElementById("cityButton");
var cityNameEl = document.getElementById("cityName");
var apiKey = '5c7bbb9b2135cd2940045fc0c9f3f01f';
var locationEl = document.getElementById("location");
var currentTempEl = document.getElementById('currentTemp');
var currentWeatherEl = document.getElementById('currentWeather');


var getLocation = function() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(passLocations);
    } else {
      alert('Not able to find your location')
    }
  }

var forcast = function (lat, long) {
    
  console.log(lat, long);
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=5c7bbb9b2135cd2940045fc0c9f3f01f&units=imperial';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log('forecast', data);
            currentWeather(data.city.coord.lat, data.city.coord.lon);
            displayFive(data);
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
  currentWeatherEl.textContent = "Current Weather: " + data.weather[0].main;
  
}

function displayFive(data) {
  for (let i = 1; i > data.list[i].length; i + 7) {
    console.log('displayFive', data.list[i].main.temp);
    
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
            console.log('currentWeather', data);
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
      console.log('city', data);
      forcast(data[0].lat, data[0].lon);
      currentWeather(data[0].lat, data[0].lon)
      displayFive(data);
    })
}


cityButtonEl.addEventListener('click', function(event) {
  event.preventDefault();
  var name = cityNameEl.value;
  getLocation(name);

})