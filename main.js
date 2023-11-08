import { apiKey } from "./key.js";

const apiConnect = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=istanbul&appid=${apiKey}`; //apiKey is your key

checkWeather(apiConnect);

let cInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
let error = document.querySelector(".error");
let weatherIcon = document.querySelector(".weather-icon");

cInput.addEventListener("keydown", (e) => {
  error.style.display = "none";
  if (e.key === "Enter") {
    cityWeather();
  }
});

searchButton.addEventListener("click", cityWeather);

function cityWeather() {
  if (!cInput.value || cInput.value === "") {
    error.style.display = "block";
    return;
  }
  const apiConnect = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${cInput.value}`;
  checkWeather(apiConnect);
}

async function checkWeather(apiConnect) {
  const time = new Date().getHours();
  const response = await fetch(apiConnect);
  var data = await response.json();
  document.querySelector(
    ".weather-icon"
  ).src = `images/${data.weather[0].main.toLowerCase()}.png`;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${Math.round(
    data.wind.speed
  )} km/h`;
  if (time >= 6 && time <= 19) {
    weatherIcon.style.filter = "grayscale(0)";
  } else {
    weatherIcon.style.filter = "grayscale(80%)";
  }
}
