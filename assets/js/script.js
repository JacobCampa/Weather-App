// DOM Elements
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

// Functions
// Function to store the city name in localStorage and call the getLocation function
function storeCity(event) {
    event.preventDefault();
    localStorage.setItem("city", searchedLocation.value)
    getLocation();
}

// Function to get the latitude and longitude of the city
function getLocation(event) {
    // retrieve the city name from localStorage
    localStorage.getItem("city")
    var city = localStorage.getItem("city")
    // API call to get the latitude and longitude of the city
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

// Function to get the current weather data and update the DOM
function getWeather() {
    var lat = localStorage.getItem("lat")
    var lon = localStorage.getItem("lon")
// API call to get the current weather data using the latitude and longitude
    var reqWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d304a894dc560098d52b230f23d4b1e2`

    fetch(reqWeather)
        .then(function (response) {
            return response.json();
        })
        // Update the DOM with the current weather data
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
        // Call the getForecast function to get the 5 day forecast data
    getForecast();
}

// Function to get the 5 day forecast data and update the DOM
function getForecast() {
    var lat = localStorage.getItem("lat")
    var lon = localStorage.getItem("lon")
// clear the DOM before updating it with the forecast data
    dayOne.innerHTML = ""
    dayTwo.innerHTML = ""
    dayThree.innerHTML = ""
    dayFour.innerHTML = ""
    dayFive.innerHTML = ""
// Api call to get the 5 day forecast data using the latitude and longitude
    var reqForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d304a894dc560098d52b230f23d4b1e2`

    fetch(reqForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var weatherInfo = data.list
            // loop through the data and update the DOM with the 5 day forecast data for each day
            for (let index = 0; index < weatherInfo.length; index += 8) {
                const element = weatherInfo[index];
                if (index < 7) {
                    var getDate = data.list[index].dt
                    var transformD = dayjs.unix(getDate).format('MM/DD/YYYY')
                    var addDate = document.createElement("h1")
                    addDate.innerHTML = transformD
                    dayOne.appendChild(addDate)
                    var getIcon = data.list[index].weather[0].icon
                    var icon = document.createElement('img')
                    icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
                    dayOne.appendChild(icon)
                    var getTemp = data.list[index].main.temp
                    var addTemp = document.createElement('p')
                    addTemp.textContent = `Temp: ${getTemp} F°`
                    dayOne.appendChild(addTemp)
                    var getHum = data.list[index].main.humidity
                    var addHum = document.createElement('p')
                    addHum.textContent = `Humidity: ${getHum}%`
                    dayOne.appendChild(addHum)
                    var getWind = data.list[index].wind.speed
                    var addWind = document.createElement('p')
                    addWind.textContent = `Wind Speed: ${getWind} MPH`
                    dayOne.appendChild(addWind)
                }
                else if (index < 15) {
                    var getDate = data.list[index].dt
                    var transformD = dayjs.unix(getDate).format('MM/DD/YYYY')
                    var addDate = document.createElement("h1")
                    addDate.innerHTML = transformD
                    dayTwo.appendChild(addDate)
                    var getIcon = data.list[index].weather[0].icon
                    var icon = document.createElement('img')
                    icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
                    dayTwo.appendChild(icon)
                    var getTemp = data.list[index].main.temp
                    var addTemp = document.createElement('p')
                    addTemp.textContent = `Temp: ${getTemp} F°`
                    dayTwo.appendChild(addTemp)
                    var getHum = data.list[index].main.humidity
                    var addHum = document.createElement('p')
                    addHum.textContent = `Humidity: ${getHum}%`
                    dayTwo.appendChild(addHum)
                    var getWind = data.list[index].wind.speed
                    var addWind = document.createElement('p')
                    addWind.textContent = `Wind Speed: ${getWind} MPH`
                    dayTwo.appendChild(addWind)
                }
                else if (index < 23) {
                    var getDate = data.list[index].dt
                    var transformD = dayjs.unix(getDate).format('MM/DD/YYYY')
                    var addDate = document.createElement("h1")
                    addDate.innerHTML = transformD
                    dayThree.appendChild(addDate)
                    var getIcon = data.list[index].weather[0].icon
                    var icon = document.createElement('img')
                    icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
                    dayThree.appendChild(icon)
                    var getTemp = data.list[index].main.temp
                    var addTemp = document.createElement('p')
                    addTemp.textContent = `Temp: ${getTemp} F°`
                    dayThree.appendChild(addTemp)
                    var getHum = data.list[index].main.humidity
                    var addHum = document.createElement('p')
                    addHum.textContent = `Humidity: ${getHum}%`
                    dayThree.appendChild(addHum)
                    var getWind = data.list[index].wind.speed
                    var addWind = document.createElement('p')
                    addWind.textContent = `Wind Speed: ${getWind} MPH`
                    dayThree.appendChild(addWind)
                }
                else if (index < 31) {
                    var getDate = data.list[index].dt
                    var transformD = dayjs.unix(getDate).format('MM/DD/YYYY')
                    var addDate = document.createElement("h1")
                    addDate.innerHTML = transformD
                    dayFour.appendChild(addDate)
                    var getIcon = data.list[index].weather[0].icon
                    var icon = document.createElement('img')
                    icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
                    dayFour.appendChild(icon)
                    var getTemp = data.list[index].main.temp
                    var addTemp = document.createElement('p')
                    addTemp.textContent = `Temp: ${getTemp} F°`
                    dayFour.appendChild(addTemp)
                    var getHum = data.list[index].main.humidity
                    var addHum = document.createElement('p')
                    addHum.textContent = `Humidity: ${getHum}%`
                    dayFour.appendChild(addHum)
                    var getWind = data.list[index].wind.speed
                    var addWind = document.createElement('p')
                    addWind.textContent = `Wind Speed: ${getWind} MPH`
                    dayFour.appendChild(addWind)
                }
                else {
                    var getDate = data.list[index].dt
                    var transformD = dayjs.unix(getDate).format('MM/DD/YYYY')
                    var addDate = document.createElement("h1")
                    addDate.innerHTML = transformD
                    dayFive.appendChild(addDate)
                    var getIcon = data.list[index].weather[0].icon
                    var icon = document.createElement('img')
                    icon.src = `https://openweathermap.org/img/wn/${getIcon}.png`
                    dayFive.appendChild(icon)
                    var getTemp = data.list[index].main.temp
                    var addTemp = document.createElement('p')
                    addTemp.textContent = `Temp: ${getTemp} F°`
                    dayFive.appendChild(addTemp)
                    var getHum = data.list[index].main.humidity
                    var addHum = document.createElement('p')
                    addHum.textContent = `Humidity: ${getHum}%`
                    dayFive.appendChild(addHum)
                    var getWind = data.list[index].wind.speed
                    var addWind = document.createElement('p')
                    addWind.textContent = `Wind Speed: ${getWind} MPH`
                    dayFive.appendChild(addWind)
                }
            }

        })
        // Call the savedCities function to update the history buttons
    savedCities();
}

// Function to update the history buttons
function savedCities() {
    var city = localStorage.getItem("city");

    // Check if a button with the same city name already exists
    if (!document.querySelector(`button.city[value="${city}"]`)) {
        var addCity = document.createElement("button");
        addCity.textContent = city;
        addCity.value = city; // Set the value attribute for easier identification
        addCity.classList.add("btn", "btn-secondary", "btn-lg", "btn-block", "city");
        addCity.setAttribute("type", "button");

        document.querySelector("#history").appendChild(addCity);

        addCity.addEventListener("click", function () {
            // Clear localStorage before setting the city from the history button
            localStorage.clear();
            localStorage.setItem("city", city);
            getLocation();
        });
    }
}
// Event Listener to call the storeCity function when the search button is clicked
search.addEventListener("click", storeCity)