import { Prediction } from "../model/save.model.js";

export const fetchPrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findOne()
            .sort({ createdAt: -1 })
            .limit(1);

        if (!prediction) {
            return res.status(404).json({ message: 'No prediction data found' });
        }

        res.status(200).json(prediction);
    } catch (error) {
        console.error('Fetch Prediction Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};
