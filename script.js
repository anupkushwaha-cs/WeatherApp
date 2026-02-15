const apiKey = "22d673aa847a74abcfab2a9631736610";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

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
    document.getElementById("cityName").innerText = data.name;
document.getElementById("temperature").innerText =
    `${data.main.temp} °C`;
document.getElementById("description").innerText =
    data.weather[0].description;

// 🌤 Icon
const iconCode = data.weather[0].icon;
document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// 💧 Humidity
document.getElementById("humidity").innerText =
    data.main.humidity + "%";

// 💨 Wind
document.getElementById("wind").innerText =
    data.wind.speed + " km/h";

   
  } catch (error) {
    alert("Something went wrong");
  }
}
