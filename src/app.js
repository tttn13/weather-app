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

    cityListItem.appendChild(header);
    cityListItem.appendChild(cityTemp);
    cityListItem.appendChild(cityFigure);

    document.querySelector("ul").appendChild(cityListItem);
  };
  return {
    createForm,
    setUpViews,
  };
})();

const getWeatherData = (() => {
  const showError = (errorMessage, city) => {
    if (city.validity.typeMismatch) {
      errorMessage.textContent = "Entered value needs to be a city name";
    } else if (city.validity.patternMismatch) {
      errorMessage.textContent = "Entered value needs to be in alphabet";
    }
    errorMessage.setAttribute("class", "error active");
  };

  const isDuplicate = (input_value) => {
    const listItems = Array.from(document.querySelectorAll(".city"));
    let isDup = false;
    if (listItems.length > 0) {
      listItems.forEach((item) => {
        const content = item
          .querySelector(".city-name span")
          .textContent.toLowerCase();
        console.log(content);
        console.log(input_value);
        if (content === input_value.toLowerCase()) {
          isDup = true;
        }
      });
    }
    return isDup;
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
      console.log(input.value);
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

  async function getWeather(cityName) {
    const API_KEY = "ef064064bbf6210a74b85db187186402";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
    try {
      let response = await fetch(url, { mode: "cors" });
      let cityData = await response.json();
      appLayout.setUpViews(cityData);
    } catch (error) {
      const errorMessage = document.querySelector(".error");
      errorMessage.textContent = "Please search for a valid city 😩";
    }
  }
  return {
    getWeather,
    validateForm,
    showError,
    isDuplicate,
  };
})();

export { appLayout, getWeatherData };
