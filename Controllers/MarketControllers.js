import Market from "../Models/Markets.js";
import  Project from "../Models/Projects.js";

// POST /api/markets
export const createMarket = async (req, res) => {
  try {
    const {
      title,
      mainHeading,
      mainDescription,
      imageUrl,
      secondHeading,
      secondDescription,
      descriptionImageUrl,
      highlightsHeading,
      highlightsDescriptions, // this should be an array of strings
      highlightsDescriptionImageUrl
    } = req.body;

    if (!title || !mainHeading || !mainDescription || !imageUrl) {
  return res.status(400).json({ success: false, message: "Missing required fields" });
}


    const market = new Market({
      title,
      mainHeading,
      mainDescription,
      imageUrl,
      secondHeading,
      secondDescription,
      descriptionImageUrl,
      highlightsHeading,
      highlightsDescriptions,
      highlightsDescriptionImageUrl
    });

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
     // For each market, fetch its related projects
    const marketsWithProjects = await Promise.all(
      markets.map(async (market) => {
        const projects = await Project.find({ market: market._id });
        return {
          ...market.toObject(),
          projects // attach projects to each market
        };
      })
    )
    res.status(200).json({ success: true, data: marketsWithProjects });
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