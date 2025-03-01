import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.params;
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
    const solarResponse = await axios.get(`${process.env.SOLAR_DATA_URL}`);
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
