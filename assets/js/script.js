var form = document.querySelector(".weather-card form");
var searchInput = form.cityname;
var searchButton = document.querySelector(".search-btn");
var city = document.querySelector(".city-name");
var temperature = document.querySelector(".temp-celcius");
var weatherDescription = document.querySelector(".weather-desc");
var weatherImg = document.querySelector(".weather-img");
var description = document.querySelector(".description");
var weatherWrapper = document.querySelector(".weather .wrapper");
var apiKey = "638ebebf7fbf92a5e76ef37754e0631b";

// fetch Weather
function fetchWeather(cityName) {
  city.innerHTML = 'loading...';
  temperature.innerHTML = 'loading...';
  description.innerHTML = 'loading...';
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showWeather(data);
    })
    .catch(function (error) {
      searchInput.value = "";
      searchButton.classList.remove("pointer-auto");
      console.log(error.name + ' : ' +  error.message);
    });
}

// show Weather
function showWeather(data) {
  if(data.cod = 404) {
  city.innerHTML = 'no city found';
  temperature.classList.add('display-none');
  weatherDescription.classList.add('display-none');
  searchInput.value = "";
  }

  weatherWrapper.style.backgroundImage = 'url(assets/images/' + data.weather[0].main + '.jpg)';
  city.innerHTML = data.name + "," + data.sys.country;
  temperature.innerHTML = Math.round(data.main.temp) + "&degC";
  weatherImg.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  description.innerHTML = data.weather[0].main;
  searchInput.value = "";
  searchButton.classList.remove("pointer-auto");
  temperature.classList.remove('display-none');
  weatherDescription.classList.remove('display-none');
}

// call fetchWeather when page load / reload
fetchWeather('mumbai');

// if input field is empty than search button will not work
searchInput.addEventListener("keyup", function () {
  if (searchInput.value == "") {
    searchButton.classList.remove("pointer-auto");
  } else {
    searchButton.classList.add("pointer-auto");
  }
});

// search button click event
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchWeather(searchInput.value.trim());
});