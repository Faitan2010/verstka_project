//TODO: 1 - show/hide content +
//TODO: 2 - save data +
//TODO: 3 - error message if not found result +
//TODO: 4 - debounce input
//TODO: 5 - request timeout

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

let date = new Date()
times.innerHTML = date.toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})
setInterval(function () {
    let date = new Date()
    times.innerHTML = date.toLocaleTimeString('ru', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}, 1000)
if (window.localStorage.getItem('weather') !== null) {
    const review = window.localStorage.getItem('weather');
    const dataOne = JSON.parse(review);
    tips.classList.remove('active-tips');
    input.value = '';
    weatherText.innerHTML = dataOne.name + ` (${dataOne.sys.country})`;
    temper.innerHTML = `${dataOne.main.temp}°C`;
    temperFeel.innerHTML = dataOne.main.feels_like;
    sky.innerHTML = dataOne.weather[0].description;
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${dataOne.weather[0].icon}@2x.png`);
    windSpeed.innerHTML = dataOne.wind.speed;
    bar.innerHTML = dataOne.main.pressure;
    wrapper.classList.add('wrapper-active');
}

input.addEventListener('input', function (e) {
    tips.innerHTML = '';
    if (input.value.length < 2) {
        text.classList.add('active');
        tips.classList.remove('active-tips');
        return;
    }
    text.classList.remove('active');
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=18c5ded70673077016efa068226c43a4&units=metric`)
        .then((res) => res.json())
        .then((data) => {
            if (data.length === 0) {
                console.log(data.length);
                tips.classList.remove('active-tips')
                text.innerHTML = 'error message if not found result'
                text.classList.add('active')
                return;
            }
            for (let value of data) {
                const paragraf = document.createElement('p');
                paragraf.innerHTML = value.name;
                paragraf.classList.add('info')
                tips.classList.add('active-tips')
                paragraf.addEventListener('click', (r) => {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${value.lat}&lon=${value.lon}&appid=18c5ded70673077016efa068226c43a4&units=metric`)
                        .then((resOne) => resOne.json())
                        .then((dataOne) => {
                            console.log(dataOne);
                            if (dataOne.cod === 200) {
                                tips.classList.remove('active-tips');
                                input.value = '';
                                weatherText.innerHTML = dataOne.name + ` (${dataOne.sys.country})`;
                                temper.innerHTML = `${dataOne.main.temp}°C`;
                                temperFeel.innerHTML = dataOne.main.feels_like;
                                sky.innerHTML = dataOne.weather[0].description;
                                icon.setAttribute('src', `http://openweathermap.org/img/wn/${dataOne.weather[0].icon}@2x.png`);
                                windSpeed.innerHTML = dataOne.wind.speed;
                                bar.innerHTML = dataOne.main.pressure;
                                wrapper.classList.add('wrapper-active');
                                window.localStorage.setItem('weather', `${JSON.stringify(dataOne)}`)
                            }
                        })
                })
                tips.appendChild(paragraf);
            }
        })
        .catch((err) => err)
})
input.addEventListener('blur', () => {
    if (text.classList.contains('active')) {
        text.classList.remove('active')
    }
})
console.log(`${input.value}`)
