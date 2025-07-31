import ProjectArray from '../Models/ProjectsArray.js';

// ✅ Create or Update the single project array
export const createOrUpdateProjectArray = async (req, res) => {
  const { projects } = req.body;

  if (!Array.isArray(projects) || projects.length === 0) {
    return res.status(400).json({ success: false, message: 'Projects array is required.' });
  }

  try {
    const updated = await ProjectArray.findOneAndUpdate(
      {}, // no filter, operate on first document
      { $set: { projects } },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('❌ Error in create/update:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get the single project array
export const getProjectArray = async (req, res) => {
  try {
    const result = await ProjectArray.findOne().populate({
        path: 'projects',
        populate: [
          { path: 'market' },
          { path: 'services' }
        ]
      });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Project array not found' });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('❌ Error in get:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete the single project array
export const deleteProjectArrayById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ProjectArray.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project array not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully', data: deleted });
  } catch (error) {
    console.error('❌ Error in delete by ID:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
