import mongoose, {Schema} from 'mongoose';

const locationSchema = new Schema({
    name: {type: String, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
});
const Location = mongoose.model('Location', locationSchema);
export default Location;