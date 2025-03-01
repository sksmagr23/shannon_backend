import {mongoose, Schema} from 'mongoose';

const DashboardSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
}, {timestamps: true, collection: 'dashboard'});

export const Dashboard = mongoose.model('Dashboard', DashboardSchema);
 