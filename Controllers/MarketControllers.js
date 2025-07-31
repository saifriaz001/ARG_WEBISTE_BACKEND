import Market from "../Models/Markets.js";

// POST /api/markets
export const createMarket = async (req, res) => {
  try {
    const { title, heading, description, imageUrl } = req.body;

    const market = new Market({ title, heading, description, imageUrl });
    const saved = await market.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('❌ Error creating market:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create market' });
  }
};

// GET /api/markets
export const getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: markets });
  } catch (error) {
    console.error('❌ Error fetching markets:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch markets' });
  }
};

export const deleteMarket = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMarket = await Market.findByIdAndDelete(id);

    if (!deletedMarket) {
      return res.status(404).json({ success: false, message: 'Market not found' });
    }

    res.status(200).json({ success: true, message: 'Market deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting market:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete market' });
  }
};