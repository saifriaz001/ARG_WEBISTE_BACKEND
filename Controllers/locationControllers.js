import Location from '../Models/Location.js ';

// POST /api/locations
export const createLocation = async (req, res) => {
  try {
    const { country, state, town } = req.body;

    const location = new Location({ country, state, town });
    const saved = await location.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('❌ Error creating location:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create location' });
  }
};

// GET /api/locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    console.error('❌ Error fetching locations:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch locations' });
  }
};

