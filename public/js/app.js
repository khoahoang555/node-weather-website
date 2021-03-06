const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const imgOne = document.querySelector('#img-1');

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    imgOne.src = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = 'temperature: ' + data.forecast.temperature + ', feelslike: ' + data.forecast.feelslike + ', weather_descriptions: ' + data.forecast.weather_descriptions + ', humidity: ' + data.forecast.humidity;
                imgOne.src = data.forecast.weather_icons;
            }
        });
    });
});