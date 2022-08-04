const times = document.querySelector('.five-text');
const input = document.querySelector('input');
const text = document.querySelector('.text')
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
    console.log(times.innerHTML);
}, 1000)

input.addEventListener('input', function (e) {
    if (input.value.length < 2) {
        text.classList.add('active');
        return;
    }
    text.classList.remove('active');
})
input.addEventListener('blur', ()=> {
    if (text.classList.contains('active')){
        text.classList.remove('active')
    }
} )