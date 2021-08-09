
//OpenWeather Info
const weatherKey = '82510feaa0c1d3a300a7a754ff134404';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

//Foursquare Info
const clientId = 'DAA45JAHI3WM3VF4SICMNH32LXGSPZX0RBLGHJQSRSFWYPDJ';
const clientSecret = '34UVTFOBSNO30D5DOS5CT32H5EZHIS1JB1V03EO4NZJNOITJ';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

//Page Elements
let input = document.querySelector("#input");
const button = document.querySelector('#submit');
const destination = document.querySelector('#destination');

//Fetch Weather
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
//Fetch Venue
const getVenues = async () => {
    try {
        console.log(input.value);
        const apiURL = `${url}${input.value}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210726`;
        console.log(apiURL);
        const response = await fetch(apiURL);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const venues = jsonResponse.response.groups[0].items.map(parameter => parameter.venue);
            console.log(venues);
            return venues;
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
//M/sec to mph
const windMph = (meterPerSecond) => {
    return (meterPerSecond * 2.237).toFixed(1);
}
//Render Weather
const renderWeather = (data) => {
    document.querySelector("#weather-degrees").innerHTML = kToF(data.main.temp) + "°F";
    document.querySelector("#wind").innerHTML = windMph(data.wind.speed) + " mph";
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon +".png";
    document.querySelector("#overview").innerHTML = data.weather[0].description;
    document.querySelector("#humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector("#city").innerHTML = data.name;
}
//Render Venues
const renderVenues = (data) => {
    document.querySelector("#icon1").src =  data[0].categories[0].icon.prefix + "bg_64"+ data[0].categories[0].icon.suffix;
    document.querySelector("#attraction1-name").innerHTML = data[0].name;
    document.querySelector("#address1").innerHTML = data[0].location.address;

    document.querySelector("#icon2").src =  data[1].categories[0].icon.prefix + "bg_64"+ data[0].categories[0].icon.suffix;
    document.querySelector("#attraction2-name").innerHTML = data[1].name;
    document.querySelector("#address2").innerHTML = data[1].location.address;

    document.querySelector("#icon3").src =  data[2].categories[0].icon.prefix + "bg_64"+ data[0].categories[0].icon.suffix;
    document.querySelector("#attraction3-name").innerHTML = data[2].name;
    document.querySelector("#address3").innerHTML = data[2].location.address;
  

}

const executeSearch = () => {
    event.preventDefault()
    getWeather().then(data => renderWeather(data));
    getVenues().then(data => renderVenues(data));
    document.querySelector(".bottom").style.visibility = "visible";
    //change background picture of city input
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + input.value +"')"
}

button.addEventListener('click', executeSearch);