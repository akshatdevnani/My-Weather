
function GetInfo(city)
{
    alert(city);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    "f208fedb3b19b6c3594724120382b501")
    .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
    .then(data => {
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + city;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".desc").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?abstract)";
    })
}


document.querySelector(".search button").addEventListener("click", function () {
    GetInfo(document.querySelector(".search-bar").value);
  });
document.querySelector(".search-bar").addEventListener("keyup", function(event)
{
   if(event.key=="Enter")
   {
    GetInfo(document.querySelector(".search-bar").value);
   }
})  

function getLocation(data){
  var api_key = 'aea2c66d957643f9be7a0036c7f9268d';
  var latitude= data.coords.latitude;
  var longitude = data.coords.longitude;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
      GetInfo(data.results[0].components.state_district); // print the location

    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };
  
  request.send();
}

function geocodeLocation()
{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation, console.error);
  }
  else {
    console.log("error fetching location");
  }
  
}

geocodeLocation();