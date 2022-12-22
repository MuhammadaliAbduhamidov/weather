const btn = document.querySelector(".form button");
const locat = document.querySelector(".location");
const weather = document.querySelector(".weather-body");
const next = document.querySelector(".next");
const btns = document.querySelector(".btns button");
const input = document.querySelector(".form input");

locat.classList.add("hide");

// btn.addEventListener("click", () => {
//   locat.classList.add("active");
// });

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    requestApi(input.value);
  }
});

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf7258639fcb3339dcad152ef122aba8`;
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

// const images={}
const weatherResult = document.createElement("div");

function back() {
  locat.classList.add("hide");
  locat.classList.remove("show");
  weather.classList.add("show");
  weather.classList.remove("show");
  weather.classList.remove("hide");
  next.innerHTML = ``;
  next.classList.remove("active");
  input.value = "";
  weatherResult = document.removeChild("div");
}

function weatherDetails(info) {
  if (info.cod == "404") {
    next.innerHTML = `${input.value} ${info.message} `;
    next.classList.add("active");
    input.value = "";
    console.log(next);
  } else {
    next.innerHTML = `Getting Weather details... `;
    next.classList.add("bg");

    const { description, id, main } = info.weather[0];

    const weathers =
      id > 800
        ? "./img/cloud.png"
        : id == 800
        ? "./img/clear.png"
        : id > 700 && id < 800
        ? "./img/haze.png"
        : id >= 600 && id <= 622
        ? "./img/snow.png"
        : (id >= 500 && id <= 531) || (id >= 300 && id <= 321)
        ? "./img/rain.png"
        : id >= 200 && id <= 232
        ? "./img/strom.png"
        : "";

    weatherResult.classList.add("weather-body");
    weatherResult.innerHTML = `
    <div class="weather-text" ${(onclick = back)}  }>
    <i class="fa-solid fa-arrow-left" ></i>
    <h1>Weather App</h1>
  </div>
  <div class="main">
    <div class="climate">
    <img src=${weathers} alt="">
    </div>
    <div class="temp"><span>${Math.floor(
      info.main.temp - 273
    )}<sup>°</sup>C</span></div>
    <span>${description}</span>
    <div> 
    <i class="fa-sharp fa-solid fa-location-dot"></i>
    <span> ${
      input.value[0].toUpperCase() + input.value.slice(1).toLowerCase()
    } ${info.sys.country}</span>
    </div>
    <div class="weather-end">
    <div class="feels">
    <i class="fa-solid fa-temperature-quarter"></i>
      <div class="temp">
        <span>${Math.floor(info.main.temp - 273)}<sup>°</sup>C</span>
        <p>Feels like</p>
      </div>
     
    </div>
    <div class="humidity">
    <img src="./img/Без названия.jfif" alt="">
    <div class="humidity-end">
    <span>${info.main.humidity}%</span>
    <p>humidity</p>
    </div>
    </div>
    </div>
  </div>
    `;
    locat.append(weatherResult);

    locat.classList.add("show");
    weather.classList?.add("hide");
  }
}
