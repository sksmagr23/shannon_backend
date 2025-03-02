# Hack it out | Technex'25 | Backend Repo

## Shannon Backend - Renewable Energy Forecasting API

Backend service for the Shannon platform that provides renewable energy forecasting using machine learning models and weather data integration.

### Features

- **Dashboard Management**
  - Store and retrieve location-based dashboard data
  - Real-time energy generation predictions
  - Integration with ML model for forecasting

- **Weather Integration**
  - Current weather data retrieval
  - Weather forecasting
  - Historical weather data access

- **Location Services**
  - Location data storage and retrieval
  - Coordinate-based queries
  - City name resolution

### Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **External APIs**: 
  - Weather API integration
  - ML Model API integration
- **Other Tools**:
  - Axios for HTTP requests
  - CORS for cross-origin support
  - JWT for token management

### ML Model Integration

The backend integrates with a deployed machine learning model at `http://172.20.96.175:8000/predict` that provides energy generation predictions based on:

- Latitude
- Longitude
- Timestamp

The model returns predictions for:
- Solar energy generation
- Wind energy generation
- Hydro energy generation

### Environment Variables

Create a `.env` file in the root directory with:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
SOLAR_DATA_URL_1=solar_api_url_part1
SOLAR_DATA_URL_2=solar_api_url_part2
SOLAR_DATA_URL_3=solar_api_url_part3
```

### API Endpoints

#### Dashboard Routes
- `POST /api/dashboard/add` - Add new dashboard data
- `GET /api/dashboard/getdashboard` - Get dashboard with predictions

#### Weather Routes
- `GET /api/weather/current/:city` - Get current weather
- `GET /api/weather/forecast/:city` - Get weather forecast
- `GET /api/weather/history/:city` - Get historical weather data

#### Location Routes
- `POST /api/location/add` - Add new location
- `GET /api/location/get` - Get all locations

### Local Setup

1. **Clone the Repository**
```bash
git clone https://github.com/sksmagr23/shannon_backend.git
cd shannon_backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env
# Edit .env with your configuration values
```

4. **Start the Server**
```bash
npm run dev
```

5. **Access API**
The server will start on `http://localhost:8000` (or your configured PORT)

