import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  solar_gen: {
    type: [Number],
    required: true,
    validate: [arrayLimit]
  },
  wind_gen: {
    type: [Number],
    required: true,
    validate: [arrayLimit]
  },
  hydro_gen: {
    type: [Number],
    required: true,
    validate: [arrayLimit]
  },
  dates: {
    type: [Date],
    required: true,
    validate: [arrayLimit]
  }
});

function arrayLimit(val) {
  return val.length === 14;
}

export const Prediction = mongoose.model('Prediction', predictionSchema);