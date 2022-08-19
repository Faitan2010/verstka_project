//TODO: 1 - show/hide content +
//TODO: 2 - save data +
//TODO: 3 - error message if not found result +
//TODO: 4 - debounce input
//TODO: 5 - request timeout

//TODO: enter keypress +
//TODO: hide tips by input blur +

//Issues
//global variables
//similar code blocks
//separate api calls

const times = document.querySelector('.five-text');
const input = document.querySelector('input');
const text = document.querySelector('.text');
const weatherText = document.querySelector('.start-text');
const tips = document.querySelector('.tips');
const temper = document.querySelector('.second-text');
const temperFeel = document.querySelector('.third-text > span');
const sky = document.querySelector('.clouds');
const icon = document.querySelector('.img');
const wrapper = document.querySelector('.wrapper')
const windSpeed = document.querySelector('.text-second > span');
const bar = document.querySelector('.flex-end > span');

updateTime(times);
setInterval(function () {
    updateTime(times);
}, 1000);

if (window.localStorage.getItem('weather') !== null) {
    const review = window.localStorage.getItem('weather');
    setData(JSON.parse(review));
}

input.addEventListener('input', handleSearchInput)
input.addEventListener('keypress', handleEnterKeypress);
input.addEventListener('blur', hideError);

function handleSearchInput(e) {
    const value = e.target.value;
    tips.innerHTML = '';
    if (value.length < 2) {
        setError(text, 'Enter more then 1 character');
        return;
    }
    hideTips();

    setTipsList(value, 5);
}

function setTipsList(inputText, tipsCount = 5) {
    getData.getTipsList(inputText, tipsCount)
        .then((data) => {
            if (data.length === 0) {
                setError(text, 'not found result');
                return;
            }
            for (let value of data) {
                createTip(value);
            }
        })
        .catch((err) => err)
}

function hideTips() {
    text.classList.remove('active');
}

function hideError() {
    text.classList.remove('active');
}

function createTip(cityData) {
    const paragraf = document.createElement('p');
    paragraf.innerHTML = cityData.name;
    paragraf.classList.add('info')
    tips.classList.add('active-tips')
    paragraf.addEventListener('click',
        () => selectTip(cityData.lat, cityData.lon))
    tips.appendChild(paragraf);
}

function selectTip(lat, lon) {
    getData.getWeatherData(lat, lon)
        .then((dataOne) => {
            if (dataOne.cod === 200) {
                input.value = '';
                setData(dataOne);
                window.localStorage.setItem('weather', `${JSON.stringify(dataOne)}`)
            }
        })
}

function handleEnterKeypress(e) {
    if (e.key === 'Enter') {
        hideTips();
        hideError();
    }
}

function setData(data) {
    tips.classList.remove('active-tips');
    weatherText.innerHTML = data.name + ` (${data.sys.country})`;
    temper.innerHTML = `${formattedTemperature(data.main.temp)}°C`;
    temperFeel.innerHTML = formattedTemperature(data.main.feels_like);
    sky.innerHTML = data.weather[0].description;
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    windSpeed.innerHTML = data.wind.speed;
    bar.innerHTML = data.main.pressure;
    wrapper.classList.add('wrapper-active');
}

function formattedTemperature(temperatureValue) {
    return Math.floor(Number(temperatureValue));
}

function updateTime(clock) {
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString('ru', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

function setError(errorElem, errorMessage) {
    errorElem.innerHTML = errorMessage;
    errorElem.classList.add('active');
    tips.classList.remove('active-tips');
}
setInterval (function f () {
    const review = window.localStorage.getItem('weather');
    const reviewParse = JSON.parse(review)
    selectTip(reviewParse.coord.lat, reviewParse.coord.lon)      
},10000)