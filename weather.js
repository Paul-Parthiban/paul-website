// https://api.openweathermap.org/data/2.5/weather?zip=07470&appid=5670cb22608853cc7531a1aa12630f5e&units=metric
// 5670cb22608853cc7531a1aa12630f5e

const api = {
    key: "5670cb22608853cc7531a1aa12630f5e",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('#zip-code');
  const continent = document.querySelector('continent');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    var icon_code = weather.weather[0].icon;
    let weather_icon = document.querySelector('.current .weather_icon');
    weather_icon.src = "http://openweathermap.org/img/w/" + icon_code + ".png";
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
  }