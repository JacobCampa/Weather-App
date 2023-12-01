var searchedLocation = document.querySelector("#cities")
var search = document.querySelector("#search")
var today = document.querySelector("#current")
var future = document.querySelector("#fiveday")
var currentCity = document.querySelector("#city")
var dayOne = document.querySelector('#day1')
var dayTwo = document.querySelector('#day2')
var dayThree = document.querySelector('#day3')
var dayFour = document.querySelector('#day4')
var dayFive = document.querySelector('#day5')
var historyRef = ""

function storeCity(event) {
    event.preventDefault();
    localStorage.setItem("city", searchedLocation.value)
    getLocation();
}

function getLocation(event) {
    localStorage.getItem("city")
    var city = localStorage.getItem("city")
    var reqLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&APPID=d304a894dc560098d52b230f23d4b1e2`
    fetch(reqLocation)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat
            lon = data[0].lon
            localStorage.setItem("lat", lat)
            localStorage.setItem("lon", lon)
            getWeather();
        })
}

function getWeather() {
    var lat = localStorage.getItem("lat")
    var lon = localStorage.getItem("lon")

    var reqWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d304a894dc560098d52b230f23d4b1e2`

    fetch(reqWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var date = document.querySelector("#date")
            var temp = document.querySelector("#temp")
            var wind = document.querySelector("#wind")
            var humidity = document.querySelector("#humidity")
            var icon = document.querySelector("#icon")
            var curDate = dayjs().format('MM/DD/YYYY')
            var getIcon = data.weather[0].icon
            icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
            var getName = localStorage.getItem("city")
            currentCity.textContent = `City: ${getName}`
            var getTemp = data.main.temp
            temp.textContent = `Current Temp: ${getTemp} F°`
            var getHum = data.main.humidity
            humidity.textContent = `Humidity: ${getHum}%`
            var getWind = data.wind.speed
            wind.textContent = `Wind Speed: ${getWind} MPH`
            date.textContent = curDate
        })
}

search.addEventListener("click", storeCity)