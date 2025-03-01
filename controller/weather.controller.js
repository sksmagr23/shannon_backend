import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const { latitude, longitude } = req.body;
    console.log(city);
    const response = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/current.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          aqi: "no",
        },
      }
    );
    const solarResponse = await axios.get(`${process.env.SOLAR_DATA_URL_1}${latitude}${process.env.SOLAR_DATA_URL_2}${longitude}${process.env.SOLAR_DATA_URL_3}`);
    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,sunshine_duration,shortwave_radiation,direct_radiation,diffuse_radiation
    const solarData = solarResponse.data;
    const arr = [response.data, solarData];
    console.log(solarData);
    res.json(arr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const { days = 14 } = req.query;
    const response = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/forecast.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          days: days,
          aqi: "no",
          alerts: "no",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { city } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const response = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/history.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          dt: date,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
