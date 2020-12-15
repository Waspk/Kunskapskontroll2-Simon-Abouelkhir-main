

let form = document.querySelector('#city-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    let cityNameInput = document.querySelector('#city-name')

    let cityName = cityNameInput.value;

    const apiKey = 'f9920d86d1abe5f49d94f3556ba12467'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

    fetch(url).then(
        function(response){
           
           
            
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
        
            
            else if (response.status === 401) {
                throw "API error";
            }

        }
    ).then(
        function(data){
           
            let name = data.name;
            let icon = data.weather[0].icon;
            let description = data.weather[0].description;
            let temp = Math.floor(data.main.temp);
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;

            addDataToDom(name,icon,description,temp,windSpeed,humidity);
            changeBackground(temp);
           
           
            
        }
    ).catch(function(error){
        
        
        errorMessage.innerText = error;
    
    });

})



function addDataToDom(n,i,d,t,ws,h){
    
    let tempBig = document.querySelector('.header .temp');
    let tempSmall = document.querySelector('.info-list .temp');
    tempBig.innerHTML = `${t}<span>°</span>`;
    tempSmall.innerText = t + "°C";

    
    let weatherElement = document.querySelector('.weather');
    weatherElement.innerText = d;


    let nameElement = document.querySelector('.city-name');
    nameElement.innerText = n;

    
    let iconElement = document.querySelector('.title .icon');
    iconElement.src = `http://openweathermap.org/img/wn/${i}@2x.png`
    iconElement.style.display = 'block';

    
    let windElement = document.querySelector('.wind');
    windElement.innerText = ws + 'm/s'

    
}


function changeBackground(temp){
    let appContainer = document.querySelector('.app-container');
    if(temp <= 5){
        appContainer.style.backgroundImage = "url(img/winter.jpg')"
    } else if(temp > 5 && temp <= 20){
        appContainer.style.backgroundImage = "url('img/autumn.jpg')"
    } else if(temp > 20){
        appContainer.style.backgroundImage = "url('./img/summer.jpg')"

    }
}
