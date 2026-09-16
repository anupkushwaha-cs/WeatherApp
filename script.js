const apiKey = "22d673aa847a74abcfab2a9631736610";

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");


// City Suggestions
cityInput.addEventListener("input", async function () {

    const city = cityInput.value.trim();

    if (city.length < 2) {
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        return;
    }

    try {

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        suggestions.innerHTML = "";

        data.forEach(function (item) {

            const div = document.createElement("div");

            div.innerHTML = `
                <span>📍</span>
                <div>
                    <strong>${item.name}</strong>
                    <small>
                        ${item.state ? item.state + ", " : ""}
                        ${item.country}
                    </small>
                </div>
            `;

            div.onclick = function () {

                cityInput.value = item.name;

                suggestions.innerHTML = "";
                suggestions.style.display = "none";

                getWeather();
            };

            suggestions.appendChild(div);

        });

        if (data.length > 0) {
            suggestions.style.display = "block";
        } else {
            suggestions.style.display = "none";
        }

    } catch (error) {

        console.log(error);

    }

});


// Get Weather
async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.getElementById("cityName").innerText =
            data.name;

        document.getElementById("temperature").innerText =
            `${Math.round(data.main.temp)} °C`;

        document.getElementById("description").innerText =
            data.weather[0].description;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("humidity").innerText =
            data.main.humidity + "%";

        document.getElementById("wind").innerText =
            data.wind.speed + " m/s";

    } catch (error) {

        alert("Something went wrong");

    }
}