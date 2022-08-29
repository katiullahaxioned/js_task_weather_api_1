var searchInput = form.cityname;
var searchButton = document.querySelector(".search-btn");
var weatherCard = document.querySelector(".weather-card");
var city = document.querySelector(".city-name");
var temperature = document.querySelector(".temp-celcius");
var weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?q=thane&units=metric&appid=638ebebf7fbf92a5e76ef37754e0631b";

// common function for weather card background
function weatherBgColor(weatherType) {
  if (weatherType == "Haze") {
    weatherCard.style.background = "var(--clr-haze)";
  } else if (weatherType == "Clouds") {
    weatherCard.style.background = "var(--clr-cloud)";
  } else if (weatherType == "Clear") {
    weatherCard.style.background = "var(--clr-clear)";
  } else if (weatherType == "Mist") {
    weatherCard.style.background = "var(--clr-mist)";
  } else {
    weatherCard.style.background = "var(--clr-white)";
  }
}

// display searched city's weather on button clicked
function displayWeather() {
  var inputValue = searchInput.value.trim();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue +
      "&units=metric&appid=638ebebf7fbf92a5e76ef37754e0631b"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weatherType = data.weather[0].main;
      weatherBgColor(weatherType);
      city.innerHTML = data.name + "," + data.sys.country;
      temperature.innerHTML = data.main.temp + " C";
      searchInput.value = "";
      searchButton.classList.remove("pointer-auto");
    })
    .catch(function (error) {
      searchInput.value = "";
      searchButton.classList.remove("pointer-auto");
      alert("Fetch error! or invalid input");
    });
}

// on page load - one city's weather must display
fetch(weatherApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var weatherType = data.weather[0].main;
    weatherBgColor(weatherType);
    city.innerHTML = data.name + "," + data.sys.country;
    temperature.innerHTML = data.main.temp + " C";
    searchInput.value = "";
    searchButton.classList.remove("pointer-auto");
  })
  .catch(function (error) {
    console.log(error.name, 'Fetch error!');
  });

// if input field is empty than search button will not work
searchInput.addEventListener("keyup", function () {
  if (searchInput.value == "") {
    searchButton.classList.remove("pointer-auto");
  } else {
    searchButton.classList.add("pointer-auto");
  }
});

// search button click event
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  displayWeather();
});