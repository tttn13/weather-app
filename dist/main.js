/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/API.js":
/*!********************!*\
  !*** ./src/API.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst API_data = (() => {\n  const API_KEY = \"ef064064bbf6210a74b85db187186402\";\n  const get_city_URL = (cityName) => {\n    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;\n  };\n  const get_lat_lon_URL = (lat, lon) => {\n    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;\n  };\n\n  return { get_city_URL, get_lat_lon_URL };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API_data);\n\n\n//# sourceURL=webpack://weather-app/./src/API.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"appLayout\": () => (/* binding */ appLayout),\n/* harmony export */   \"getWeatherData\": () => (/* binding */ getWeatherData)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/API.js\");\n\n\nconst appLayout = (() => {\n  const createForm = () => {\n    const main = document.getElementById(\"main\");\n\n    const form = document.createElement(\"form\");\n\n    const userInput = document.createElement(\"input\");\n    userInput.type = \"text\";\n    userInput.placeholder = \"Search for a city\";\n    userInput.pattern = \"[A-Za-z ]+\";\n    userInput.focus();\n    userInput.setAttribute(\"required\", \"true\");\n\n    const error_message_span = document.createElement(\"span\");\n    error_message_span.className = \"error\";\n    error_message_span.setAttribute(\"aria-live\", \"polite\");\n\n    const button = document.createElement(\"button\");\n    button.type = \"submit\";\n    button.innerText = \"SUBMIT\";\n\n    const first_div = document.createElement(\"div\");\n    first_div.appendChild(userInput);\n    first_div.appendChild(button);\n    const second_div = document.createElement(\"div\");\n    second_div.appendChild(error_message_span);\n    form.appendChild(first_div);\n    form.appendChild(second_div);\n\n    main.appendChild(form);\n  };\n\n  const setUpViews = (cityData) => {\n    const { main, name, sys, weather } = cityData;\n    const icon = `https://openweathermap.org/img/wn/${weather[0][\"icon\"]}@2x.png`;\n\n    const cityListItem = document.createElement(\"li\");\n    cityListItem.classList.add(\"city\");\n    cityListItem.id = name;\n\n    const delete_icon = document.createElement(\"i\");\n    delete_icon.className = \"fas fa-times\";\n    delete_icon.addEventListener(\"click\", () => {\n      getWeatherData.deleteCity(name);\n      removeCard(name);\n    });\n\n    const header = document.createElement(\"h2\");\n    header.className = \"city-name\";\n    header.dataset.name = `${name}, ${sys.country}`;\n    const header_span = document.createElement(\"span\");\n    header_span.innerHTML = `${name}`;\n    const header_sup = document.createElement(\"sup\");\n    header_sup.innerHTML = `${sys.country}`;\n    header.appendChild(header_span);\n    header.appendChild(header_sup);\n\n    const cityTemp = document.createElement(\"div\");\n    cityTemp.className = \"city-temp\";\n    cityTemp.innerText = `${Math.round(main.temp)}`;\n\n    const symbol = document.createElement(\"sup\");\n    symbol.innerText = \"°F\";\n    cityTemp.appendChild(symbol);\n    const cityFigure = document.createElement(\"figure\");\n    const cityImage = document.createElement(\"img\");\n    cityImage.className = \"city-icon\";\n    cityImage.src = `${icon}`;\n    cityImage.alt = `${weather[0][\"main\"]}`;\n\n    const figCaption = document.createElement(\"figcaption\");\n    figCaption.innerHTML = `${weather[0][\"description\"]}`;\n    cityFigure.appendChild(cityImage);\n    cityFigure.appendChild(figCaption);\n\n    cityListItem.appendChild(delete_icon);\n    cityListItem.appendChild(header);\n    cityListItem.appendChild(cityTemp);\n    cityListItem.appendChild(cityFigure);\n\n    document.querySelector(\"ul\").appendChild(cityListItem);\n  };\n\n  const removeCard = (selected_city) => {\n    const all_cities = document.querySelectorAll(\"li\");\n    all_cities.forEach((city) => {\n      if (city.id == selected_city) {\n        city.remove();\n      }\n    });\n  };\n  return {\n    createForm,\n    setUpViews,\n  };\n})();\n\nconst getWeatherData = (() => {\n  let cities = [];\n\n  const showError = (errorMessage, city) => {\n    if (city.validity.typeMismatch) {\n      errorMessage.textContent = \"Entered value needs to be a city name\";\n    } else if (city.validity.patternMismatch) {\n      errorMessage.textContent = \"Entered value needs to be in alphabet\";\n    }\n    errorMessage.setAttribute(\"class\", \"error active\");\n  };\n\n  const isDuplicate = (input_value) => {\n    let duplicateCities = cities.filter(\n      (item) => item.name.toLowerCase() == input_value.toLowerCase()\n    );\n    return duplicateCities.length > 0;\n  };\n\n  const deleteCity = (cityName) => {\n    cities = cities.filter(\n      (item) => item.name.toLowerCase() != cityName.toLowerCase()\n    );\n    persistToStorage();\n  };\n\n  const capitalize = ([firstLetter, ...restOfWord]) =>\n    firstLetter.toUpperCase() + restOfWord.join(\"\");\n\n  const validateForm = () => {\n    const form = document.querySelector(\"form\");\n    const input = document.querySelector(\"input\");\n    let errorMessage = document.querySelector(\".error\");\n    input.addEventListener(\"input\", () => {\n      if (input.validity.valid) {\n        errorMessage.textContent = \"\";\n        errorMessage.className = \"error\";\n      } else {\n        showError(errorMessage, input);\n      }\n    });\n\n    form.addEventListener(\"submit\", (event) => {\n      event.preventDefault();\n      const isDup = isDuplicate(input.value);\n      if (isDup) {\n        errorMessage.textContent = `You already know the weather for ${capitalize(\n          input.value\n        )}`;\n        form.reset();\n        input.focus();\n      } else {\n        getWeather(input.value);\n        errorMessage.textContent = \"\";\n        form.reset();\n        input.focus();\n      }\n    });\n  };\n\n  const loadPage = () => {\n    const message = document.querySelector(\".error\");\n    const success = (pos) => {\n      let crd = pos.coords;\n      message.innerText = \"\";\n      getLocalWeather(crd.latitude, crd.longitude);\n    };\n\n    document.addEventListener(\"DOMContentLoaded\", (event) => {\n      message.innerText = \"Retrieving your location...\";\n      navigator.geolocation.getCurrentPosition(success);\n    });\n  };\n\n  async function getLocalWeather(lat, lon) {\n    await callAPI(\n      _API__WEBPACK_IMPORTED_MODULE_0__.default.get_lat_lon_URL(lat, lon),\n      \"Unable to retrieve your location\"\n    );\n  }\n\n  async function getWeather(cityName) {\n    await callAPI(\n      _API__WEBPACK_IMPORTED_MODULE_0__.default.get_city_URL(cityName),\n      \"Please search for a valid city 😩\"\n    );\n  }\n\n  async function callAPI(url, message) {\n    try {\n      let response = await fetch(url, { mode: \"cors\" });\n      let cityData = await response.json();\n      if (!isDuplicate(cityData.name)) {\n        cities.push(cityData);\n        console.log(cities);\n        persistToStorage();\n        appLayout.setUpViews(cityData);\n      }\n    } catch (error) {\n      const errorMessage = document.querySelector(\".error\");\n      errorMessage.textContent = message;\n    }\n  }\n\n  const CITIES_LIST_ID = \"citiesStorage\";\n\n  const persistToStorage = () => {\n    localStorage.setItem(CITIES_LIST_ID, JSON.stringify(cities));\n  };\n\n  const loadFromStorage = () => {\n    const citiesFromStorage = JSON.parse(localStorage.getItem(CITIES_LIST_ID));\n    if (citiesFromStorage !== null) {\n      cities = citiesFromStorage;\n      console.log(cities);\n    } else {\n      cities = [];\n    }\n    cities.forEach(appLayout.setUpViews);\n  };\n\n  return {\n    getWeather,\n    validateForm,\n    showError,\n    isDuplicate,\n    loadPage,\n    deleteCity,\n    loadFromStorage,\n  };\n})();\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\n\n_app__WEBPACK_IMPORTED_MODULE_0__.getWeatherData.loadFromStorage();\n\n_app__WEBPACK_IMPORTED_MODULE_0__.appLayout.createForm();\n_app__WEBPACK_IMPORTED_MODULE_0__.getWeatherData.validateForm();\n_app__WEBPACK_IMPORTED_MODULE_0__.getWeatherData.loadPage();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;