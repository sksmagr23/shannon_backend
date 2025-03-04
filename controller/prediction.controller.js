import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getPrediction = async (latitude, longitude, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const data = {
            "Message": [Number(latitude), Number(longitude), Date.now()]
        };
        
        try {
            console.log(`Attempt ${attempt}/${retries}`);
            console.log("ML_API_URL:", process.env.ML_API_URL);
            const url = `${process.env.ML_API_URL}/predict/`;
            console.log("Making request to:", url);
            console.log("Request data:", JSON.stringify(data, null, 2));
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                proxy: false
            };

            const response = await axios.post(url, data, config);
            
            console.log("Response status:", response.status);
            console.log("Response data:", JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            const errorDetails = {
                message: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data
                } : null,
                request: {
                    url: `${process.env.ML_API_URL}/predict`,
                    method: 'POST',
                    data: data
                }
            };
            
            console.error(`Attempt ${attempt}/${retries} failed:`, errorDetails);

            // On last retry, throw detailed error with specific guidance
            if (attempt === retries) {
                throw new Error(JSON.stringify(errorDetails));
            }
            
            // Wait before retrying (exponential backoff)
            await delay(1000 * Math.pow(2, attempt - 1));
        }
    }
};

export const fetchPrediction = async (req, res) => {
    try {
        const {latitude, longitude} = req.body;
        console.log("Received request body:", req.body);
        
        if (!latitude || !longitude) {
            return res.status(400).json({ 
                message: 'Missing required parameters: latitude and longitude',
                received: req.body 
            });
        }

        console.log("Sending prediction data:", { latitude, longitude });
        const prediction = await getPrediction(latitude, longitude);
        console.log("Prediction data:", prediction);
        if (!prediction) {
            return res.status(404).json({ message: 'No prediction data found' });
        }

        console.log('Sending prediction data:', prediction);
        res.status(200).json(prediction);
    } catch (error) {
        console.error('Fetch Prediction Error:', error.message);
        
        // Parse the error details if available
        let errorDetails;
        try {
            errorDetails = JSON.parse(error.message);
        } catch (e) {
            errorDetails = { message: error.message };
        }

        res.status(500).json({ 
            message: 'Failed to fetch prediction',
            error: errorDetails,
            troubleshooting: [
                "Check if the ML service is running at " + process.env.ML_API_URL,
                "Verify network connectivity between backend and ML service",
                "Check if there are any firewall rules blocking the connection"
            ]
        });
    }
};
