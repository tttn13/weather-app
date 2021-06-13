const API_data = (() => {
  const API_KEY = "ef064064bbf6210a74b85db187186402";
  const get_city_URL = (cityName) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
  };
  const get_lat_lon_URL = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  };

  return { get_city_URL, get_lat_lon_URL };
})();

export default API_data;
