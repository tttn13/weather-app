import { appLayout, getWeatherData } from "./app";

getWeatherData.loadFromStorage();

appLayout.createForm();
getWeatherData.validateForm();
getWeatherData.loadPage();
