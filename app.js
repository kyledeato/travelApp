//Foursquare API Info

//OpenWeather Info
const weatherKey = '82510feaa0c1d3a300a7a754ff134404';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather'



//Page Elements
const input = document.querySelector('#city');
const button = document.querySelector('#button');
const destination = document.querySelector('#destination');
const weatherDiv = document.querySelector('#weather1');
//Fetch
const getForecast = async () => {
    const urlToFetch = `${weatherURL}?&q=${input.value}&APPID=${weatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            return jsonResponse;
        }
    } catch (error) {
        console.log(error)
    }
}
//Populate
function populate(data) {
    weatherDiv.innerHTML = ` 
    <h2>${data.name}</h2>`
}

//Render Functions
function render(input) {
    getForecast().then(data => {
        populate(data);
    })
}

button.addEventListener('click', () => {
    const currentVal = input.value;

    getForecast().then(data => {
        populate(data)
    })
    
})
