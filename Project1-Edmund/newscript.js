const APIKey = "2015c5f25f689dcf6dedba026011e032";


//Fetch Weather Data
async function fetchWeather(latitude,longitude,units){
    const unitDegree = (units == 'metric')? 'C':'F'
    const request = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${APIKey}`
    
    //Current Weather
    const todayURL = `https://api.openweathermap.org/data/2.5/weather?${request}`
    const fetchToday = await fetch(todayURL)
    
    fetchToday.json().then(function(data){
        const temperature = `${Number(data.main.temp).toFixed(1)}&deg;${unitDegree}`
        document.querySelector('#forecastBtn').innerHTML = `${temperature}<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png'/>`
    })

    //Forecast Weather
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?${request}`
    const fetchForecast = await fetch(forecastURL)
    
    fetchForecast.json().then(function(data){
        for (i = 1; i <= 5; i++) {
            document.querySelector("#forecast").innerHTML += 
            `<div id="forecastInput" style='text-align: right'>
                <img src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png'>
                ${data.city.name} <br> Temperature: ${data.list[i].main.temp} Feels like: ${data.list[i].main.feels_like}
            </div>`;
        }
    })
}


// Get Weather Data
function getLocation(units){
    navigator.geolocation.getCurrentPosition(function(position){
        fetchWeather(position.coords.latitude,position.coords.longitude,units)
    })
}

//Time Interval At Every Second
document.querySelector('#dateTime').textContent = moment().format('ll LTS')
setInterval(() => {
    document.querySelector('#dateTime').textContent = moment().format('ll LTS')
}, 1000);


//Enable Modal
$('#forecastBtn').on('shown.bs.modal', function () {
    $('#forecastInput').trigger('focus')
})