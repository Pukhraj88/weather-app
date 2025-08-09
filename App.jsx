import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { WiHumidity, WiStrongWind, WiThermometer, WiCloud } from "react-icons/wi";
import { FiSearch, FiMapPin, FiClock } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 120,
      damping: 14
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=5ccb9737e65c436c8d783824250608&q=${location}&aqi=no`
      );
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Location not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-light text-gray-800 mb-1">Weather</h1>
          <p className="text-gray-500">Simple weather forecasting</p>
        </motion.header>

        {/* Main Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          {/* Search Form */}
          <form onSubmit={fetchWeather} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search location..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Content */}
          {weather ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {/* Location */}
              <div className="flex items-center justify-center mb-4">
                <FiMapPin className="text-gray-400 mr-2" />
                <h2 className="text-xl font-medium text-gray-800 text-center">
                  {weather.location.name}, {weather.location.country}
                </h2>
              </div>

              {/* Time */}
              <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                <FiClock className="mr-1" />
                <span>{new Date(weather.location.localtime).toLocaleString()}</span>
              </div>

              {/* Main Weather */}
              <div className="flex items-center justify-around mb-8">
                <div className="text-center">
                  <img 
                    src={weather.current.condition.icon} 
                    alt={weather.current.condition.text}
                    className="w-20 h-20 mx-auto"
                  />
                  <p className="text-gray-600 capitalize">
                    {weather.current.condition.text}
                  </p>
                </div>
                <div className="text-5xl font-light text-gray-800">
                  {weather.current.temp_c}°
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <WiThermometer className="text-2xl mr-2" />
                    <span className="text-sm">Feels like</span>
                  </div>
                  <p className="text-xl font-medium text-gray-800">
                    {weather.current.feelslike_c}°
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <WiHumidity className="text-2xl mr-2" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <p className="text-xl font-medium text-gray-800">
                    {weather.current.humidity}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <WiStrongWind className="text-2xl mr-2" />
                    <span className="text-sm">Wind</span>
                  </div>
                  <p className="text-xl font-medium text-gray-800">
                    {weather.current.wind_kph} km/h
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <WiCloud className="text-2xl mr-2" />
                    <span className="text-sm">Clouds</span>
                  </div>
                  <p className="text-xl font-medium text-gray-800">
                    {weather.current.cloud}%
                  </p>
                </div>
              </div>
            </motion.div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full"
              />
              <p className="mt-4 text-gray-600">Loading weather data...</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-gray-700 font-medium mb-1">Search for weather</h3>
              <p className="text-gray-500 text-sm">Enter a location above</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

