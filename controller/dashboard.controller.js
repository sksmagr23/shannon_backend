import { Dashboard } from "../model/dashboard.model.js";
import axios from "axios";
import https from "https";
import { Prediction } from "../model/save.model.js";
import dotenv from "dotenv";

dotenv.config();


export const addDashboard = async (req, res) => {
    try {

        const {cityName, latitude, longitude } = req.body;
        
        if (!latitude || !longitude || !cityName) {
            return res.status(400).json({ message: 'Latitude and Longitude and City Name a`re required' });
        }

        const newDashboard = new Dashboard({
            latitude: Number(latitude),
            longitude: Number(longitude),
            cityName: cityName
        });

        const instance = await newDashboard.save();
        res.status(201).json(instance);
    } catch (error) {
        console.error('Add Dashboard Error:', error.message);
        res.status(409).json({ message: error.message });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const {_id} = req.body;
        const dashboard = await Dashboard.findOne({_id: _id});
        
        if (!dashboard) {
            return res.status(404).json({ message: 'No dashboard found' });
        }
        return res.status(200).json(dashboard);
    } catch (error) {
        console.error('Get Dashboard Error:', error);
        res.status(404).json({ message: error.message });
    }
};