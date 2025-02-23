const searchInp = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const mainImg = document.querySelector(".weather-state");

const apiKey = "94ae2bb0ac2f7057a8d5bd493b9678c5";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (response.status == 404) {
        searchInp.value = "";
        searchInp.classList.add("inp-error");
        searchInp.setAttribute("placeholder", "This Name Is Invalid");
    } else {
        console.clear();
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(
            data.main.temp
        )}°C`;
        document.querySelector(".humidity").innerHTML = `${Math.round(
            data.main.humidity
        )}%`;
        document.querySelector(".wind").innerHTML = `${Math.round(
            data.wind.speed
        )} KM/H`;
        checkImageExists(
            `imgs/weather-state/${data.weather[0].main}.png`,
            (exists) => {
                if (exists) {
                    mainImg.src = `imgs/weather-state/${data.weather[0].main}.png`;
                } else {
                    mainImg.src = "imgs/weather-state/unknown.png";
                }
            }
        );
    }
}

searchBtn.addEventListener("click", () => {
    if (searchInp.value !== "") {
        checkWeather(searchInp.value);
        searchInp.classList.remove("inp-error");
        searchInp.setAttribute("placeholder", "Enter City Name");
    } else {
        searchInp.classList.add("inp-error");
        searchInp.setAttribute("placeholder", "Empty Input");
    }
});

// Advanced Function To Minimize My Code Length
function checkImageExists(src, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = src;
}
