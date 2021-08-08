
//OpenWeather Info
const weatherKey = '82510feaa0c1d3a300a7a754ff134404';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather'

//Page Elements
let input = document.querySelector("#input");
const button = document.querySelector('#submit');
const destination = document.querySelector('#destination');

//Fetch
const getWeather = async () => {
    try {
        console.log(input.value);
        const apiURL = `${weatherURL}?&q=${input.value}&APPID=${weatherKey}`;
        console.log(apiURL);
        const response = await fetch(apiURL);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        } else {
            console.log("request failed!");
        }
    } catch (error) {
        console.log(error);
    }
}

//K to F
const kToF = (kelvin) => {
    return Math.round((kelvin - 273) * (9/5) + 32);
}
const renderWeather = (data) => {
    document.querySelector("#weather-degrees").innerHTML = kToF(data.main.temp) + "°F";
    document.querySelector("#feels-like").innerHTML = "Feels like: " + kToF(data.main.temp) + "°F";
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon +".png";
    document.querySelector("#overview").innerHTML = data.weather[0].description;
    document.querySelector("#humidity").innerHTML = kToF(data.main.temp) + "°F";
}

const executeSearch = () => {
    event.preventDefault()
    getWeather().then(data => renderWeather(data));
}

button.addEventListener('click', executeSearch);