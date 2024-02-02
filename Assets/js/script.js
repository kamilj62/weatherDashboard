var word = document.getElementById("demo");
var lat;
var long;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Not able to find your location')
  }
}

function showPosition(position) {
  word.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  lat = position.coords.latitude;
  long = position.coords.longitude;
  return lat;
  return long;
  
}
console.log(lat, long);
getLocation();

// var forcast = function (location) {
//   var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=5c7bbb9b2135cd2940045fc0c9f3f01f';

//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function (data) {
//             console.log(data);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to forecast');
//       });
//   };

//   forcast();

// var city = function (city) {
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5c7bbb9b2135cd2940045fc0c9f3f01f';
  
//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function (data) {
//             console.log(data);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to city');
//       });
//   };

