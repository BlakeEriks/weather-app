const API_KEY = '2bcd8813bf8a0e9c4ca5a3e506e47834';

const $city = $('#city');
const $temp = $('#temp');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $input = $('input[type="text"]');
const $weatherDetails = $('.weather-details');

let weatherData;
let dayCount = 1;

const render = () => {
    $city.text(weatherData.city.name);
    $temp.text(weatherData.list[0].main.temp);
    $feelsLike.text(weatherData.list[0].main.feels_like);
    $weather.text(weatherData.list[0].weather[0].main);
}

const handleSubmit = event => {
    event.preventDefault();
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${$input.val()}&units=imperial&appid=${API_KEY}`
    }).then(
        data => {
            weatherData = data;
            render();
        },
        error => {
            console.log(error);
        }
    );

    $('form').fadeOut(500, () => {
        $input.val('');
        $weatherDetails.fadeIn(500);
    });
}

$('form').on('submit', handleSubmit);
$('button').on('click', () => {
    $weatherDetails.fadeOut(500, () => {
        $('form').fadeIn(500);
    });
    
});
$('.settings').on('click', () => {
    $('.header-text').hide();
    $('.day-counter').show();
});
$('.home').on('click', () => {
    $('.day-counter').hide();
    $('.header-text').show();
});
$('.day-inc-button').on('click', () => {
    if (dayCount < 5) { 
        dayCount++;
        $('.day-count').text(dayCount);
    }
});
$('.day-dec-button').on('click', () => {
    if (dayCount > 1) { 
        dayCount--;
        $('.day-count').text(dayCount);
    }
});

$('.day-counter').hide();
$weatherDetails.toggle();
