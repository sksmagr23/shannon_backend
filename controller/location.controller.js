import Location from "../model/location.model.js";

const addLocation = async (req, res) => {
  try {
    const { name, cityName, latitude, longitude } = req.body;
    const location = await Location.create({
      name,
      cityName,
      latitude,
      longitude,
    });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: "Unable to add location" });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Unable to get locations" });
  }
};
export { addLocation, getLocations };
