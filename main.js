const times = document.querySelector('.five-text');
const input = document.querySelector('input');
const text = document.querySelector('.text');
const weatherText = document.querySelector('.start-text');
const tips = document.querySelector('.tips')
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

input.addEventListener('input', function (e) {
    tips.innerHTML = ''
    if (input.value.length < 2) {
        text.classList.add('active');
        return;
    }
    text.classList.remove('active');
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=18c5ded70673077016efa068226c43a4`)
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data)
        for(let value of data) {
            const paragraf = document.createElement('p');
            paragraf.innerHTML = value.name;

            tips.appendChild(paragraf)
        }
    })
    .catch((err)=>err)
})
input.addEventListener('blur', ()=> {
    if (text.classList.contains('active')){
        text.classList.remove('active')
    }
} )
console.log(`${input.value}`)
// document.createElement()
// Element.uppendChild