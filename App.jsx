import { useState } from "react";
import axios from "axios";
import React from "react";
export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [getWeather, setGetWeather] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const FetchWeather = async () => {
    if (!inputValue) return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=5ccb9737e65c436c8d783824250608&q=${inputValue}&aqi=no`
      );
      const data = await response.data;
      setGetWeather(data);
      console.log(data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const hanldeFormSubmit = (e) => {
    e.preventDefault();
    FetchWeather();
  };

  return (
    <>
      {/* weather app */}
      <div className=" bg-blue-200 min-h-screen font-sans text-xl m-auto p-8 rounded-sm shadow-lg">
        <h1 className="text-center text-2xl font-bold">Weather App</h1>

        <form
          action=""
          onSubmit={(e) => hanldeFormSubmit(e)}
          className="flex flex-col items-center p-4 gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter city name"
            className="border-b-1 border-blue-800 border-dashed outline-none text-lg p-1"
          />
          <button
            type="submit"
            className="text-sm bg-green-400 outline-2 outline-green-500 px-3 py-1 rounded-full"
          >
            Submit
          </button>
        </form>

        {/* if loading false */}
        {loading && (
          <div className="font-sans text-xl m-auto px-4 py-8 bg-white/10 rounded-lg shadow-lg">
            {/* location and time */}
            <div className="text-center">
              <p className="text-[15px]">{getWeather?.location?.localtime}</p>
              <p>
                <span>{getWeather?.location?.name}</span>,
                {getWeather?.location?.region}({getWeather?.location?.country})
              </p>
            </div>

            {/* icon */}
            <div>
              <img
                src={getWeather?.current?.condition?.icon}
                alt="Icon"
                className="w-25 h-25 m-auto"
              />
            </div>

            {/* temp */}
            <div className="grid grid-cols-2 w-[50%] m-auto gap-4 text-center bg-white/10 p-4 rounded-lg">
              <div>
                <p className="text-lg font-semibold">
                  {getWeather?.current?.temp_c}°C
                </p>
                <p className="text-sm">Temperature</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {getWeather?.current?.wind_kph} kph
                </p>
                <p className="text-sm">Wind Speed</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {getWeather?.current?.humidity}%
                </p>
                <p className="text-sm">Humidity</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {getWeather?.current?.cloud}%
                </p>
                <p className="text-sm">Cloudiness</p>
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <p className="text-center">Search for a city to see weather data </p>
        )}
      </div>
    </>
  );
};
