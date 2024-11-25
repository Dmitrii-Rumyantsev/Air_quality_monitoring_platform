// Создаем модуль AngularJS
var app = angular.module('airQualityApp', []);

// Контроллер для карты
app.controller('MapController', function($scope, $http) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Вставьте ваш API ключ для OpenWeatherMap

    // Инициализация карты
    var map = L.map('air-quality-map').setView([51.505, -0.09], 2); // Начальная позиция карты и масштаб

    // Добавление слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Функция для получения данных о качестве воздуха
    $scope.getAirQuality = function(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // Выполняем GET-запрос к API
        $http.get(url).then(function(response) {
            const aqi = response.data.list[0].main.aqi; // Индекс качества воздуха
            const aqiDescription = $scope.getAQIDescription(aqi); // Описание AQI

            // Содержимое всплывающего окна
            const popupContent = `
                <h4>Air Quality Info</h4>
                <p>AQI: ${aqi}</p>
                <p>Description: ${aqiDescription}</p>
            `;

            // Добавляем маркер на карту с всплывающим окном
            L.marker([lat, lon]).addTo(map).bindPopup(popupContent).openPopup();
        }).catch(function(error) {
            console.error('Error fetching air quality data', error);
        });
    };

    // Функция для получения описания AQI
    $scope.getAQIDescription = function(aqi) {
        if (aqi === 1) {
            return 'Good';
        } else if (aqi === 2) {
            return 'Fair';
        } else if (aqi === 3) {
            return 'Moderate';
        } else if (aqi === 4) {
            return 'Poor';
        } else if (aqi === 5) {
            return 'Very Poor';
        } else {
            return 'Unknown';
        }
    };

    // Обработка клика на карте
    map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        // Получаем данные о качестве воздуха для выбранной точки
        $scope.getAirQuality(lat, lon);
    });
});
