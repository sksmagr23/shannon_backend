import { Dashboard } from "../model/dashboard.model.js";
import axios from "axios";
import https from "https";

export const addDashboard = async (req, res) => {
    try {
        console.log("Hello1");
        const { latitude, longitude } = req.body;
        
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }

        const newDashboard = new Dashboard({
            latitude: Number(latitude),
            longitude: Number(longitude)
        });

        const instance = await newDashboard.save();
        res.status(201).json(instance);
    } catch (error) {
        console.error('Add Dashboard Error:', error.message);
        res.status(409).json({ message: error.message });
    }
};

const getPrediction = async (latitude, longitude) => {
    try {
        const data = {
            "Message": [Number(latitude), Number(longitude), Number(Date.now())]
        };
        const response = await axios.post(`${process.env.ML_API_URL}/predict`, data, {
            headers: {
            'Content-Type': 'application/json'
            },
            httpsAgent: new https.Agent({
            rejectUnauthorized: false,
            })
        });
        console.log("Hello the response is", response.data);
        return response.data;
    } catch (error) {
        console.error('Prediction Error:', error.message);
        throw error;
    }
};

export const getDashboard = async (req, res) => {
    try {
        console.log("Hello2");
        const dashboard = await Dashboard.findOne().sort({ createdAt: -1 });
        
        if (!dashboard) {
            return res.status(404).json({ message: 'No dashboard found' });
        }

        const prediction = await getPrediction(dashboard.latitude, dashboard.longitude);
        await Dashboard.deleteOne({ _id: dashboard._id });

        res.status(200).json({
            dashboard,
            prediction
        });
    } catch (error) {
        console.error('Get Dashboard Error:', error);
        res.status(404).json({ message: error.message });
    }
};