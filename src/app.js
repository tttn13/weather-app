import API_data from "./API";

const appLayout = (() => {
  const createForm = () => {
    const main = document.getElementById("main");

    const form = document.createElement("form");

    const userInput = document.createElement("input");
    userInput.type = "text";
    userInput.placeholder = "Search for a city";
    userInput.pattern = "[A-Za-z ]+";
    userInput.focus();
    userInput.setAttribute("required", "true");

    const error_message_span = document.createElement("span");
    error_message_span.className = "error";
    error_message_span.setAttribute("aria-live", "polite");

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "SUBMIT";

    const first_div = document.createElement("div");
    first_div.appendChild(userInput);
    first_div.appendChild(button);
    const second_div = document.createElement("div");
    second_div.appendChild(error_message_span);
    form.appendChild(first_div);
    form.appendChild(second_div);

    main.appendChild(form);
  };

  const setUpViews = (cityData) => {
    const { main, name, sys, weather } = cityData;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

    const cityListItem = document.createElement("li");
    cityListItem.classList.add("city");
    cityListItem.id = name;

    const delete_icon = document.createElement("i");
    delete_icon.className = "fas fa-times";
    delete_icon.addEventListener("click", () => {
      getWeatherData.deleteCity(name);
      removeCard(name);
    });

    const header = document.createElement("h2");
    header.className = "city-name";
    header.dataset.name = `${name}, ${sys.country}`;
    const header_span = document.createElement("span");
    header_span.innerHTML = `${name}`;
    const header_sup = document.createElement("sup");
    header_sup.innerHTML = `${sys.country}`;
    header.appendChild(header_span);
    header.appendChild(header_sup);

    const cityTemp = document.createElement("div");
    cityTemp.className = "city-temp";
    cityTemp.innerText = `${Math.round(main.temp)}`;

    const symbol = document.createElement("sup");
    symbol.innerText = "°F";
    cityTemp.appendChild(symbol);
    const cityFigure = document.createElement("figure");
    const cityImage = document.createElement("img");
    cityImage.className = "city-icon";
    cityImage.src = `${icon}`;
    cityImage.alt = `${weather[0]["main"]}`;

    const figCaption = document.createElement("figcaption");
    figCaption.innerHTML = `${weather[0]["description"]}`;
    cityFigure.appendChild(cityImage);
    cityFigure.appendChild(figCaption);

    cityListItem.appendChild(delete_icon);
    cityListItem.appendChild(header);
    cityListItem.appendChild(cityTemp);
    cityListItem.appendChild(cityFigure);

    document.querySelector("ul").appendChild(cityListItem);
  };

  const removeCard = (selected_city) => {
    const all_cities = document.querySelectorAll("li");
    all_cities.forEach((city) => {
      if (city.id == selected_city) {
        city.remove();
      }
    });
  };
  return {
    createForm,
    setUpViews,
  };
})();

const getWeatherData = (() => {
  let cities = [];

  const showError = (errorMessage, city) => {
    if (city.validity.typeMismatch) {
      errorMessage.textContent = "Entered value needs to be a city name";
    } else if (city.validity.patternMismatch) {
      errorMessage.textContent = "Entered value needs to be in alphabet";
    }
    errorMessage.setAttribute("class", "error active");
  };

  const isDuplicate = (input_value) => {
    let duplicateCities = cities.filter(
      (item) => item.name.toLowerCase() == input_value.toLowerCase()
    );
    return duplicateCities.length > 0;
  };

  const deleteCity = (cityName) => {
    cities = cities.filter(
      (item) => item.name.toLowerCase() != cityName.toLowerCase()
    );
    persistToStorage();
  };

  const capitalize = ([firstLetter, ...restOfWord]) =>
    firstLetter.toUpperCase() + restOfWord.join("");

  const validateForm = () => {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    let errorMessage = document.querySelector(".error");
    input.addEventListener("input", () => {
      if (input.validity.valid) {
        errorMessage.textContent = "";
        errorMessage.className = "error";
      } else {
        showError(errorMessage, input);
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const isDup = isDuplicate(input.value);
      if (isDup) {
        errorMessage.textContent = `You already know the weather for ${capitalize(
          input.value
        )}`;
        form.reset();
        input.focus();
      } else {
        getWeather(input.value);
        errorMessage.textContent = "";
        form.reset();
        input.focus();
      }
    });
  };

  const loadPage = () => {
    const success = (pos) => {
      let crd = pos.coords;
      getLocalWeather(crd.latitude, crd.longitude);
    };

    document.addEventListener("DOMContentLoaded", (event) => {
      navigator.geolocation.getCurrentPosition(success);
    });
  };

  async function getLocalWeather(lat, lon) {
    await callAPI(
      API_data.get_lat_lon_URL(lat, lon),
      "Unable to retrieve your location"
    );
  }

  async function getWeather(cityName) {
    await callAPI(
      API_data.get_city_URL(cityName),
      "Please search for a valid city 😩"
    );
  }

  async function callAPI(url, message) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let cityData = await response.json();
      if (!isDuplicate(cityData.name)) {
        cities.push(cityData);
        console.log(cities);
        persistToStorage();
        appLayout.setUpViews(cityData);
      }
    } catch (error) {
      const errorMessage = document.querySelector(".error");
      errorMessage.textContent = message;
    }
  }

  const CITIES_LIST_ID = "citiesStorage";

  const persistToStorage = () => {
    localStorage.setItem(CITIES_LIST_ID, JSON.stringify(cities));
  };

  const loadFromStorage = () => {
    const citiesFromStorage = JSON.parse(localStorage.getItem(CITIES_LIST_ID));
    if (citiesFromStorage !== null) {
      cities = citiesFromStorage;
      console.log(cities);
    } else {
      cities = [];
    }
    cities.forEach(appLayout.setUpViews);
  };

  return {
    getWeather,
    validateForm,
    showError,
    isDuplicate,
    loadPage,
    deleteCity,
    loadFromStorage,
  };
})();

export { appLayout, getWeatherData };
