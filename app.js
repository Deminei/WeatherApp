const weatherForm = document.getElementById('weatherForm');
const zipCodeInput = document.getElementById('zipCode');
const currentDateElement = document.getElementById('currentDate');
const cityElement = document.getElementById('city');
const currentTempElement = document.getElementById('currentTemp');
const currentConditionsElement = document.getElementById('currentConditions');
const tempHiLoElement = document.getElementById('tempHiLo');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const zipCode = zipCodeInput.value;
    const weatherData = await getWeatherData(zipCode);
    if (weatherData) {
        currentDateElement.textContent = `Current Date: ${new Date().toLocaleDateString()}`;
        cityElement.textContent = `City: ${weatherData.name}`;
        currentTempElement.textContent = `Current Temperature: ${weatherData.main.temp}°F`;
        currentConditionsElement.textContent = `Current Conditions: ${weatherData.weather[0].description}`;
        tempHiLoElement.textContent = `Temperature Hi/Lo: ${weatherData.main.temp_max}°F/ ${weatherData.main.temp_min}°F`;
    } else {
        currentDateElement.textContent = '';
        cityElement.textContent = '';
        currentTempElement.textContent = '';
        currentConditionsElement.textContent = '';
        tempHiLoElement.textContent = '';
        alert('Failed to retrieve weather data. Please try again.');
    }
});

async function getWeatherData(zipCode) {
    try {
        const apiKey = '1ea10531f440001ea41d3dc8b032534e';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}