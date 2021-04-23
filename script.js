function currentDate() {
    document.querySelector("#currentDay").innerHTML = moment().format("l"); }

currentDate();

let weather = {
    "apiKey": "9e8297a7de594ed3964b6416e7efecc3",
    fetchWeather: function (city) {
        fetch ("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9e8297a7de594ed3964b6416e7efecc3")
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log(name,icon,description,temp, humidity,speed);
        document.querySelector(".city").innerHTML = name;
        document.querySelector("#icon").innerHTML = "http://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".temp").innerHTML = temp + "°F";
        document.querySelector(".wind").innerHTML = speed + "mph";
        document.querySelector(".humidity").innerHTML = humidity + "%";


    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value);
    }
};

document.querySelector(".btn-primary").addEventListener("submit", function() {
    weather.search();

});






