var forcast = function (location ) {
    var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=5c7bbb9b2135cd2940045fc0c9f3f01f';
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to forecast');
      });
  };

var city = function (city) {
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5c7bbb9b2135cd2940045fc0c9f3f01f';
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to city');
      });
  };

  forcast();
  city();