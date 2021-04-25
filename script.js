var cityArr = [];

var displayCity = function(city) {
    var history = document.querySelector("#list-cityOutput");
    var cityLi = document.createElement('li')
    var cityBtn = document.createElement("button");
    var text = document.createTextNode(city)
    text.classList.add("")
    cityBtn.classList.add("searchBtn");
    cityBtn.appendChild(text);
    history.appendChild(cityLi);
    cityLi.appendChild(cityBtn);
}

//var t = document.createTextNode("test content");
//b.appendChild(t);

var loadCity = function(codeName) {
    if (!JSON.parse(localStorage.getItem("city"))) {
        return;
    } else {
        if (codeName === 'clicked') {
            var children = document.querySelector('#list-cityOutput').children
            children.forEach(child => {
                document.querySelector('#list-cityOutput').removeChild(child);
            });            
        }
        cityArr = JSON.parse(localStorage.getItem("city"));
        cityArr.forEach(city => {
            displayCity(city);
        }); 
    };

}
loadCity('loaded');

var saveCity = function(city) {
    cityArr.push(city);
    localStorage.setItem("city", JSON.stringify(cityArr));
  };

function currentDate() {
    document.querySelector("#currentDay").innerHTML = moment().format("l"); 
    for(var i = 1; i<6; i++){
    document.querySelector(`#day${i}date`).innerHTML = moment().add(i, 'd').format("l");
    }
    }
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
        const { icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerHTML = name;
        document.querySelector("#icon").setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
        document.querySelector(".temp").innerHTML = temp + " °F";
        document.querySelector(".wind").innerHTML = speed + " mph";
        document.querySelector(".humidity").innerHTML = humidity + "%";


    },
    display5Day: function(data) {
        for(var i = 1; i<6; i++) {
            document.querySelector(`#day${i}temp`).innerHTML = data.list[i].main.temp + " °F";
            document.querySelector(`#day${i}wind`).innerHTML = data.list[i].wind.speed + " mph";
            document.querySelector(`#day${i}humid`).innerHTML = data.list[i].main.humidity + "%";
            document.querySelector(`#day${i}img`).setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)
        }
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value);
    },
    fiveDay: function(city) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.display5Day(data);
        });
    },
    //uvIndex: function(city) {
      //  fetch(`http://api.openweathermap.org/data/2.5/uvi?q=${city}&appid=${this.apiKey}`)
        //.then((response) => response.json())
        //.then((data) => {
          //  console.log(data);
       // })
    //}
};



document.querySelector("#form").addEventListener("submit", function(event) {
    console.log(event.target[0].value)
    event.preventDefault();
    weather.search();
    saveCity(event.target[0].value);
    loadCity('clicked');
    
});



