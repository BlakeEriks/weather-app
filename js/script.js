const API_KEY = '2bcd8813bf8a0e9c4ca5a3e506e47834';

const $city = $('#city');
const $temp = $('#temp');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $input = $('input[type="text"]');
const $weatherDetails = $('.weather-details');

let weatherData;
let dayCount = 1;
let dayIndex = 0;

const createCircleList = () => {
    if (dayCount === 1) return;
    let classes = ['fas', 'fa-circle'];
    for (let i = 0; i < dayCount; i++) {
        if (i > 0) classes[0] = 'far';
        let circle = $('<i>');
        circle.addClass(classes[0]);
        circle.addClass(classes[1]);
        circle.attr('index', i);
        $('.day-circles').append(circle);
    }
    $('.fa-circle').on('click', function() {
        if ($(this).attr('index') == dayIndex) return;
        dayIndex = $(this).attr('index');
        $('.day-circles .fas').removeClass('fas').addClass('far');
        $(this).removeClass('far').addClass('fas');
        render();
    });
}

const render = () => {
    $city.text(weatherData.city.name);
    $temp.text(weatherData.list[8 * dayIndex].main.temp);
    $feelsLike.text(weatherData.list[8 * dayIndex].main.feels_like);
    $weather.text(weatherData.list[8 * dayIndex].weather[0].main);
}

const handleSubmit = event => {
    event.preventDefault();
    $('form').fadeOut(500);
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${$input.val()}&units=imperial&appid=${API_KEY}`
    }).then(
        data => {
            weatherData = data;
            createCircleList();
            render();
            $('form').hide();
            $weatherDetails.fadeIn(500);
            $input.val('');
        },
        error => {
            $('form').fadeIn(500);
        }
    );

    
}

$('form').on('submit', handleSubmit);
$('.try-again-button').on('click', () => {
    $weatherDetails.fadeOut(500, () => {
        $('.day-circles').empty()
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
$weatherDetails.hide();