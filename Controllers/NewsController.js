import News from "../Models/News.js";


// POST /api/news
export const createNews = async (req, res) => {
  try {
  const { title, description, types, markets, services, date, imageUrl } = req.body;

    if (!title || !description || !types || !markets || !services || !date) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const newNews = new News({
      title,
      description,
      types,
      markets,
      services,
      date,
      imageUrl: imageUrl || ''
    });

    const savedNews = await newNews.save();
    res.status(201).json({ success: true, data: savedNews });
  } catch (error) {
    console.error('❌ Error creating news:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create news' });
  }
};


// ✅ GET /api/news - fetch all news
export const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find()
      .populate('types')
      .populate('markets')
      .populate('services')
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ success: true, data: newsList });
  } catch (error) {
    console.error('❌ Error fetching news:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch news' });
  }
};


// ✅ DELETE /api/news/:id - delete news by ID
export const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    res.status(200).json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting news:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete news' });
  }
};