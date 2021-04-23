function currentDate() {
    document.querySelector("#currentDay").innerHTML = moment().format("l"); }

currentDate();

let weather = {
    "apiKey": "9e8297a7de594ed3964b6416e7efecc3",
    fetchWeather: function (city) {
        fetch ("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9e8297a7de594ed3964b6416e7efecc3")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.displayWeather(data)
            this.fiveDay(city);
        });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerHTML = name;
        document.querySelector("#icon").setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
        document.querySelector(".temp").innerHTML = temp + "°F";
        document.querySelector(".wind").innerHTML = speed + "mph";
        document.querySelector(".humidity").innerHTML = humidity + "%";


    },
    display5Day: function(data) {
        for(var i = 1; i<5; i++) {
            document.querySelector(`#day${i}temp`).innerHTML = data.list[i].main.temp;
            document.querySelector(`#day${i}wind`).innerHTML = data.list[i].wind.speed;
            document.querySelector(`#day${i}humid`).innerHTML = data.list[i].main.humidity;
            document.querySelector(`#day${i}img`).setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)
        }
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value);
    },
    fiveDay: function(city) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.display5Day(data);
        });
    }
};

document.querySelector(".card").addEventListener("submit", function(event) {
    event.preventDefault();
    weather.search();

});

